"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Zap, MessageSquare, Activity, Target, ClipboardList,
  CheckCircle2, ArrowRight, ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import OtpModal from "@/components/shared/OtpModal";
import { mockCoaches, mockSlots } from "@/lib/mockData";
import { SESSION_LABELS } from "@/lib/constants";
import type { SessionType, SlotBreakdown, Client } from "@/lib/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BREAKDOWN_KEY: Record<SessionType, keyof SlotBreakdown> = {
  "trial":        "trial",
  "consultation": "consultation",
  "physio":       "physio",
  "goal-setting": "goalSetting",
  "assessment":   "assessment",
};

const SESSION_ICON: Record<SessionType, LucideIcon> = {
  "trial":        Zap,
  "consultation": MessageSquare,
  "physio":       Activity,
  "goal-setting": Target,
  "assessment":   ClipboardList,
};

function formatDisplayDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const today = new Date().toISOString().split("T")[0];

// ─── Shared UI primitives ────────────────────────────────────────────────────

const INPUT =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 " +
  "text-sm outline-none focus:border-[#0B0C2A] focus:bg-white transition-colors " +
  "placeholder:text-gray-400";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = ["Personal Info", "Select Coach & Slot", "Confirm"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-start justify-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done   = current > n;
        const active = current === n;
        return (
          <div key={label} className="flex items-start">
            {/* circle + label */}
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  done || active
                    ? "bg-[#0B0C2A] text-white shadow-sm"
                    : "border-2 border-gray-300 text-gray-400 bg-white",
                ].join(" ")}
              >
                {done ? "✓" : n}
              </div>
              <span
                className={[
                  "text-[10px] font-semibold text-center leading-tight hidden sm:block",
                  active ? "text-[#0B0C2A]" : done ? "text-gray-600" : "text-gray-400",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {/* connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "h-px mt-[18px] w-12 sm:w-20 shrink-0 transition-colors",
                  current > n ? "bg-[#0B0C2A]" : "bg-gray-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Form state types ─────────────────────────────────────────────────────────

interface PersonalInfo {
  fullName: string;
  email:    string;
  phone:    string;
  dob:      string;
  gender:   string;
}

type InfoErrors = Partial<Record<keyof PersonalInfo, string>>;

const EMPTY_INFO: PersonalInfo = { fullName: "", email: "", phone: "", dob: "", gender: "" };

// ─── BookingForm ──────────────────────────────────────────────────────────────

export default function BookingForm({
  sessionType,
  prefillData,
}: {
  sessionType: SessionType;
  prefillData?: Client;
}) {
  const initialInfo: PersonalInfo = prefillData
    ? {
        fullName: prefillData.name,
        email:    prefillData.email,
        phone:    prefillData.phone,
        dob:      prefillData.dob,
        gender:   prefillData.gender,
      }
    : EMPTY_INFO;

  const [step, setStep]       = useState(prefillData ? 2 : 1);
  const [otpOpen, setOtpOpen] = useState(false);

  // Step 1
  const [info, setInfo]           = useState<PersonalInfo>(initialInfo);
  const [errors, setErrors]       = useState<InfoErrors>({});

  // Step 2
  const [coachId, setCoachId]     = useState("");
  const [date, setDate]           = useState("");
  const [slotId, setSlotId]       = useState("");
  const [step2Err, setStep2Err]   = useState(false);

  const bKey     = BREAKDOWN_KEY[sessionType];
  const Icon     = SESSION_ICON[sessionType];
  const label    = SESSION_LABELS[sessionType];

  // derived: slots for selected coach + date (active only)
  const filteredSlots =
    coachId && date
      ? mockSlots.filter(
          (s) => s.coachId === coachId && s.date === date && s.status === "active"
        )
      : [];

  // ── Step 1 validation ──────────────────────────────────────────────────────

  function validateStep1(): InfoErrors {
    const e: InfoErrors = {};
    if (info.fullName.trim().length < 2)  e.fullName = "Enter your full name";
    if (!isValidEmail(info.email))        e.email    = "Enter a valid email address";
    if (info.phone.replace(/\D/g,"").length !== 10)
                                          e.phone    = "Enter a valid 10-digit number";
    if (!info.dob)                        e.dob      = "Select your date of birth";
    if (!info.gender)                     e.gender   = "Select your gender";
    return e;
  }

  function handleContinue() {
    const e = validateStep1();
    setErrors(e);
    if (Object.keys(e).length === 0) setOtpOpen(true);
  }

  function handleOtpVerified() {
    setOtpOpen(false);
    setStep(2);
  }

  // ── Step 2 ─────────────────────────────────────────────────────────────────

  function handleConfirm() {
    if (!coachId || !date || !slotId) { setStep2Err(true); return; }
    setStep(3);
    toast.success("Booking confirmed! See you there.");
  }

  // ── Reset ──────────────────────────────────────────────────────────────────

  function reset() {
    setStep(prefillData ? 2 : 1);
    setInfo(prefillData
      ? { fullName: prefillData.name, email: prefillData.email, phone: prefillData.phone, dob: prefillData.dob, gender: prefillData.gender }
      : EMPTY_INFO
    );
    setErrors({});
    setCoachId("");
    setDate("");
    setSlotId("");
    setStep2Err(false);
  }

  const selectedCoach = mockCoaches.find((c) => c.id === coachId);
  const selectedSlot  = mockSlots.find((s) => s.id === slotId);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <StepIndicator current={step} />

        {/* Member info card — shown when pre-filled from member login */}
        {prefillData && step < 3 && (
          <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
                Logged in as Member
              </p>
              <p className="text-sm font-semibold text-gray-800">{prefillData.name}</p>
              <p className="text-xs text-gray-500">{prefillData.email} · +91 {prefillData.phone}</p>
            </div>
            <Link href="/member" className="text-xs font-semibold text-[#0B0C2A] hover:underline shrink-0 mt-0.5">
              Edit
            </Link>
          </div>
        )}

        {/* ══ STEP 1 — Personal Info ═══════════════════════════════════════ */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            {/* Title */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Step 1 of 3
                </p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                  Book {label}
                </h1>
              </div>
            </div>

            {/* Fields — 2-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <Field label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  className={INPUT}
                  placeholder="Aarav Patel"
                  value={info.fullName}
                  onChange={(e) => {
                    setInfo((p) => ({ ...p, fullName: e.target.value }));
                    setErrors((p) => ({ ...p, fullName: undefined }));
                  }}
                />
              </Field>

              {/* Email */}
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  className={INPUT}
                  placeholder="aarav@example.com"
                  value={info.email}
                  onChange={(e) => {
                    setInfo((p) => ({ ...p, email: e.target.value }));
                    setErrors((p) => ({ ...p, email: undefined }));
                  }}
                />
              </Field>

              {/* Phone */}
              <Field label="Phone Number" error={errors.phone}>
                <div
                  className="flex items-stretch rounded-xl border border-gray-200 bg-gray-50
                             overflow-hidden focus-within:border-[#0B0C2A] focus-within:bg-white
                             transition-colors"
                >
                  <span className="flex items-center px-3 text-sm font-semibold text-gray-500 border-r border-gray-200 shrink-0">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className="flex-1 px-3 py-3 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    placeholder="98765 43210"
                    value={info.phone}
                    onChange={(e) => {
                      setInfo((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }));
                      setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                  />
                </div>
              </Field>

              {/* DOB */}
              <Field label="Date of Birth" error={errors.dob}>
                <input
                  type="date"
                  className={INPUT}
                  max={today}
                  value={info.dob}
                  onChange={(e) => {
                    setInfo((p) => ({ ...p, dob: e.target.value }));
                    setErrors((p) => ({ ...p, dob: undefined }));
                  }}
                />
              </Field>

              {/* Gender — spans both cols on mobile naturally */}
              <Field label="Gender" error={errors.gender}>
                <select
                  className={`${INPUT} cursor-pointer`}
                  value={info.gender}
                  onChange={(e) => {
                    setInfo((p) => ({ ...p, gender: e.target.value }));
                    setErrors((p) => ({ ...p, gender: undefined }));
                  }}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>
            </div>

            <button
              onClick={handleContinue}
              className="mt-7 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                         text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#0B0C2A" }}
            >
              Continue to Schedule
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ══ STEP 2 — Select Coach / Slot ══════════════════════════════════ */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                Step 2 of 3
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Schedule Your Session
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {/* Coach */}
              <Field label="Select Coach">
                <select
                  className={`${INPUT} cursor-pointer`}
                  value={coachId}
                  onChange={(e) => {
                    setCoachId(e.target.value);
                    setSlotId("");
                    setStep2Err(false);
                  }}
                >
                  <option value="" disabled>Choose a coach…</option>
                  {mockCoaches.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.role}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Date */}
              <Field label="Preferred Date">
                <input
                  type="date"
                  className={INPUT}
                  min={today}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSlotId("");
                    setStep2Err(false);
                  }}
                />
              </Field>

              {/* Slots — only after coach + date selected */}
              {coachId && date && (
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Available Time Slots
                  </p>

                  {filteredSlots.length === 0 ? (
                    <p className="text-sm text-gray-400 italic bg-gray-50 rounded-xl px-4 py-3">
                      No slots available for this coach on the selected date.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      {filteredSlots.map((slot) => {
                        const avail     = slot.breakdown[bKey];
                        const spotsLeft = avail.total - avail.booked;
                        const full      = spotsLeft <= 0;
                        const selected  = slotId === slot.id;

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={full}
                            onClick={() => { setSlotId(slot.id); setStep2Err(false); }}
                            className={[
                              "flex flex-col items-center px-4 py-3 rounded-xl border text-xs font-semibold transition-all",
                              full
                                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                                : selected
                                ? "border-[#0B0C2A] bg-[#0B0C2A] text-white shadow-sm"
                                : "border-gray-200 bg-white text-gray-700 hover:border-[#0B0C2A] hover:text-[#0B0C2A]",
                            ].join(" ")}
                          >
                            <span>{slot.startTime} – {slot.endTime}</span>
                            <span
                              className={[
                                "text-[10px] font-normal mt-0.5",
                                full ? "" : selected ? "text-blue-200" : "text-gray-400",
                              ].join(" ")}
                            >
                              {full
                                ? "Full"
                                : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Payment method — static */}
              <Field label="Payment Method">
                <div className={`${INPUT} text-gray-400 cursor-default select-none`}>
                  Pay Online Now
                </div>
              </Field>
            </div>

            {step2Err && (
              <p className="mt-4 text-xs text-red-500">
                Please select a coach, date, and an available time slot to continue.
              </p>
            )}

            <div className="flex gap-3 mt-7">
              {prefillData ? (
                <Link
                  href="/member"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-gray-200
                             text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </Link>
              ) : (
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-gray-200
                             text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
                           text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0B0C2A" }}
              >
                Confirm Booking
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — Confirmation ═════════════════════════════════════════ */}
        {step === 3 && selectedCoach && selectedSlot && (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            {/* Green check */}
            <div className="flex flex-col items-center text-center mb-7">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                <CheckCircle2 size={42} className="text-green-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-sm text-gray-500 max-w-xs">
                Your session has been successfully scheduled. See you there!
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl divide-y divide-gray-100 mb-5 overflow-hidden">
              {(
                [
                  ["Name",    info.fullName],
                  ["Session", label],
                  ["Coach",   `${selectedCoach.name} (${selectedCoach.role})`],
                  ["Date",    formatDisplayDate(selectedSlot.date)],
                  ["Time",    `${selectedSlot.startTime} – ${selectedSlot.endTime}`],
                  ["Phone",   `+91 ${info.phone}`],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 px-5 py-3.5 text-sm">
                  <span className="text-gray-400 font-medium w-20 shrink-0">{k}</span>
                  <span className="text-gray-800 font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp note */}
            <div className="flex items-center gap-2.5 text-xs text-green-700 bg-green-50
                            border border-green-100 rounded-xl px-4 py-3 mb-7">
              <span className="text-base">💬</span>
              <span className="font-medium">
                A WhatsApp confirmation has been sent to your number.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-700
                           text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Another Session
              </button>
              <Link
                href="/"
                className="flex-1 py-3.5 rounded-xl text-white text-sm font-semibold
                           text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0B0C2A" }}
              >
                Go Home
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* OTP modal */}
      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={handleOtpVerified}
        mode="booking"
      />
    </div>
  );
}
