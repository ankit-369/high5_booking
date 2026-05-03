"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/shared/Navbar";
import Spinner from "@/components/shared/Spinner";
import EditSlotModal   from "@/components/coach/EditSlotModal";
import DeleteSlotModal from "@/components/coach/DeleteSlotModal";
import BookingsTab     from "@/components/coach/BookingsTab";
import { mockCoaches, mockSlots, mockBookings } from "@/lib/mockData";
import { STORAGE_KEY } from "@/lib/auth";
import type { Slot } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function to12h(time: string): string {
  if (!time) return "";
  const [hStr, min] = time.split(":");
  const h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, "0")}:${min} ${ampm}`;
}

function slotTotals(slot: Slot) {
  const b = slot.breakdown;
  const keys = ["trial", "consultation", "physio", "goalSetting", "assessment"] as const;
  let booked = 0, total = 0;
  for (const k of keys) { booked += b[k].booked; total += b[k].total; }
  return { booked, total };
}

// ─── Badge config ─────────────────────────────────────────────────────────────

const BREAKDOWN_BADGES: {
  key: keyof Slot["breakdown"];
  label: string;
  cls: string;
}[] = [
  { key: "trial",        label: "Trial",        cls: "bg-[#FFF0EE] text-[#FF4F3C] border border-[#FF4F3C]/20" },
  { key: "consultation", label: "Consultation",  cls: "bg-blue-50 text-blue-600 border border-blue-200" },
  { key: "physio",       label: "Physio",        cls: "bg-orange-50 text-orange-600 border border-orange-200" },
  { key: "goalSetting",  label: "Goal Setting",  cls: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  { key: "assessment",   label: "Assessment",    cls: "bg-purple-50 text-purple-700 border border-purple-200" },
];

// ─── Shared style tokens ──────────────────────────────────────────────────────

const INPUT =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 " +
  "text-sm outline-none focus:border-[#0B0C2A] focus:bg-white transition-colors " +
  "placeholder:text-gray-400";

const LABEL = "text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "slots" | "add" | "bookings";

interface BreakdownForm {
  trial: number;
  consultation: number;
  physio: number;
  goalSetting: number;
  assessment: number;
}

const EMPTY_BREAKDOWN: BreakdownForm = {
  trial: 0, consultation: 0, physio: 0, goalSetting: 0, assessment: 0,
};

const BREAKDOWN_FIELDS: { key: keyof BreakdownForm; label: string }[] = [
  { key: "trial",        label: "Trial" },
  { key: "consultation", label: "Consultation" },
  { key: "physio",       label: "Physio" },
  { key: "goalSetting",  label: "Goal Setting" },
  { key: "assessment",   label: "Assessment" },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface DashboardPageProps {
  isAdmin?: boolean;
}

export default function DashboardPage({ isAdmin }: DashboardPageProps) {
  const router = useRouter();

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]               = useState<Tab>("slots");
  const [selectedCoachId, setSelectedCoachId]   = useState("c1");
  const [slots, setSlots]                       = useState<Slot[]>(mockSlots);

  // Modal state
  const [editSlot, setEditSlot]     = useState<Slot | null>(null);
  const [deleteSlot, setDeleteSlot] = useState<Slot | null>(null);

  // Add-slot form
  const [formDate, setFormDate]     = useState("");
  const [startTime, setStartTime]   = useState("");
  const [endTime, setEndTime]       = useState("");
  const [breakdown, setBreakdown]   = useState<BreakdownForm>(EMPTY_BREAKDOWN);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Loading states
  const [adding, setAdding]           = useState(false);
  const [deletingSlot, setDeletingSlot] = useState(false);

  // ── Derived ────────────────────────────────────────────────────────────────
  const selectedCoach = mockCoaches.find((c) => c.id === selectedCoachId)!;
  const initials = selectedCoach.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  const filteredSlots = slots
    .filter((s) => s.coachId === selectedCoachId)
    .sort((a, b) => a.date.localeCompare(b.date));

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    router.replace(isAdmin ? "/admin-login" : "/coach-login");
  }

  function handleEditSave(updated: Slot) {
    setSlots((prev) => prev.map((s) => s.id === updated.id ? updated : s));
    setEditSlot(null);
    toast.success("Slot updated successfully.");
  }

  async function handleDeleteConfirm(action: "cancel-all" | "block-new") {
    if (!deleteSlot) return;
    setDeletingSlot(true);
    await new Promise((r) => setTimeout(r, 800));
    if (action === "cancel-all") {
      setSlots((prev) => prev.filter((s) => s.id !== deleteSlot.id));
      toast.success("Slot deleted and bookings cancelled.");
    } else {
      setSlots((prev) =>
        prev.map((s) => s.id === deleteSlot.id ? { ...s, status: "blocked" } : s)
      );
      toast.success("Slot blocked. No new bookings allowed.");
    }
    setDeletingSlot(false);
    setDeleteSlot(null);
  }

  async function handleAddSlot() {
    const errors: string[] = [];
    if (!formDate)  errors.push("Select a date.");
    if (!startTime) errors.push("Enter a start time.");
    if (!endTime)   errors.push("Enter an end time.");
    if (startTime && endTime && endTime <= startTime)
      errors.push("End time must be after start time.");
    const totalCap = Object.values(breakdown).reduce((s, v) => s + v, 0);
    if (totalCap === 0)
      errors.push("Set at least one session type to a value greater than 0.");

    if (errors.length) { setFormErrors(errors); return; }

    setAdding(true);
    await new Promise((r) => setTimeout(r, 800));

    const newSlot: Slot = {
      id:        `s-${Date.now()}`,
      coachId:   selectedCoachId,
      date:      formDate,
      startTime: to12h(startTime),
      endTime:   to12h(endTime),
      status:    "active",
      breakdown: {
        trial:        { total: breakdown.trial,        booked: 0 },
        consultation: { total: breakdown.consultation, booked: 0 },
        physio:        { total: breakdown.physio,       booked: 0 },
        goalSetting:  { total: breakdown.goalSetting,  booked: 0 },
        assessment:   { total: breakdown.assessment,   booked: 0 },
      },
    };

    setSlots((prev) => [...prev, newSlot]);
    setFormDate("");
    setStartTime("");
    setEndTime("");
    setBreakdown(EMPTY_BREAKDOWN);
    setFormErrors([]);
    setAdding(false);
    toast.success("Slot added successfully!");
    setActiveTab("slots");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Navbar />

      <div className="min-h-screen" style={{ backgroundColor: "#F5F5F7" }}>
        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* ── User info row ──────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center
                           text-white text-sm font-bold shrink-0 select-none"
                style={{ backgroundColor: "#0B0C2A" }}
              >
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-gray-900 leading-tight">
                    {selectedCoach.name}
                  </p>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold
                                     bg-yellow-100 text-yellow-700 border border-yellow-200
                                     px-2 py-0.5 rounded-full">
                      <ShieldCheck size={10} />
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {isAdmin
                    ? "Super Admin Dashboard"
                    : `${selectedCoach.role} · Coach Dashboard`}
                </p>
              </div>
            </div>

            {/* Right side: coach selector + logout */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCoachId}
                onChange={(e) => setSelectedCoachId(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                           text-sm font-semibold text-gray-700 outline-none cursor-pointer
                           focus:border-[#0B0C2A] transition-colors shadow-sm"
              >
                {mockCoaches.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200
                           bg-white text-gray-500 text-sm font-semibold hover:bg-gray-50
                           hover:text-gray-700 transition-colors shadow-sm shrink-0"
                title="Log out"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* ── Tab bar ────────────────────────────────────────────────────── */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {(
              [
                { id: "slots",    label: "All Slots" },
                { id: "add",      label: "+ Add Slot" },
                { id: "bookings", label: "Bookings" },
              ] as { id: Tab; label: string }[]
            ).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={[
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                  activeTab === id
                    ? "bg-[#0B0C2A] text-white shadow-sm"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ══ ALL SLOTS TAB ════════════════════════════════════════════════ */}
          {activeTab === "slots" && (
            <div className="flex flex-col gap-3">
              {filteredSlots.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                  <p className="text-gray-400 text-sm mb-3">No slots found for this coach.</p>
                  <button
                    onClick={() => setActiveTab("add")}
                    className="text-sm font-semibold text-[#0B0C2A] hover:underline"
                  >
                    + Add a slot
                  </button>
                </div>
              ) : (
                filteredSlots.map((slot) => {
                  const { booked, total } = slotTotals(slot);
                  return (
                    <div
                      key={slot.id}
                      className="bg-white rounded-2xl px-5 py-4
                                 flex flex-col sm:flex-row sm:items-center gap-4
                                 hover:shadow-md transition-shadow duration-200"
                      style={{ border: "1px solid #E5E5EA" }}
                    >
                      {/* Date + time */}
                      <div className="shrink-0 sm:w-44">
                        <p className="text-base font-semibold" style={{ color: "#0B0C2A" }}>
                          {formatDate(slot.date)}
                        </p>
                        <p className="text-sm mt-0.5" style={{ color: "#6E6E73" }}>
                          {slot.startTime} – {slot.endTime}
                        </p>
                        {slot.status === "blocked" && (
                          <span className="mt-1 inline-block text-[10px] font-semibold
                                           bg-[#FFF0EE] text-[#FF4F3C] border border-[#FF4F3C]/20
                                           px-2 py-0.5 rounded-full">
                            Blocked
                          </span>
                        )}
                      </div>

                      {/* Breakdown badges */}
                      <div className="flex flex-wrap gap-1.5 flex-1">
                        {BREAKDOWN_BADGES.map(({ key, label, cls }) => {
                          const { booked: b, total: t } = slot.breakdown[key];
                          if (t === 0) return null;
                          return (
                            <span
                              key={key}
                              className={`text-xs font-medium px-3 py-1 rounded-full ${cls}`}
                            >
                              {label}: {b}/{t}
                            </span>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Booked pill */}
                        <span className="text-xs font-medium px-3 py-1 rounded-full
                                         bg-green-50 text-green-700 border border-green-200 whitespace-nowrap">
                          {booked}/{total} Booked
                        </span>

                        {/* Edit */}
                        <button
                          onClick={() => setEditSlot(slot)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                     text-sm font-medium transition-colors min-h-[36px]
                                     hover:border-[#0B0C2A]"
                          style={{ color: "#0B0C2A", border: "1px solid #E5E5EA" }}
                          title="Edit slot"
                        >
                          <Pencil size={13} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteSlot(slot)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                     text-sm font-medium transition-colors min-h-[36px]
                                     hover:bg-[#FFF0EE]"
                          style={{ color: "#FF4F3C", border: "1px solid rgba(255,79,60,0.3)" }}
                          title="Delete slot"
                        >
                          <Trash2 size={13} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ══ ADD SLOT TAB ═════════════════════════════════════════════════ */}
          {activeTab === "add" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Add Slot
              </p>
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">
                New Time Slot — {selectedCoach.name}
              </h2>

              <div className="flex flex-col gap-5">

                {/* Date */}
                <div>
                  <label className={LABEL}>Date</label>
                  <input
                    type="date"
                    className={INPUT}
                    value={formDate}
                    onChange={(e) => { setFormDate(e.target.value); setFormErrors([]); }}
                  />
                </div>

                {/* Start / End time — side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Start Time</label>
                    <input
                      type="time"
                      className={INPUT}
                      value={startTime}
                      onChange={(e) => { setStartTime(e.target.value); setFormErrors([]); }}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>End Time</label>
                    <input
                      type="time"
                      className={INPUT}
                      value={endTime}
                      onChange={(e) => { setEndTime(e.target.value); setFormErrors([]); }}
                    />
                  </div>
                </div>

                {/* Slot breakdown */}
                <div>
                  <label className={LABEL}>Slot Breakdown</label>
                  <div className="grid grid-cols-2 gap-3">
                    {BREAKDOWN_FIELDS.map(({ key, label }) => (
                      <div key={key}>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">
                          {label}
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          className={INPUT}
                          placeholder="0"
                          value={breakdown[key] || ""}
                          onChange={(e) => {
                            const v = Math.max(0, parseInt(e.target.value, 10) || 0);
                            setBreakdown((prev) => ({ ...prev, [key]: v }));
                            setFormErrors([]);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validation errors */}
                {formErrors.length > 0 && (
                  <ul className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex flex-col gap-1">
                    {formErrors.map((err, i) => (
                      <li key={i} className="text-xs text-red-600">· {err}</li>
                    ))}
                  </ul>
                )}

                {/* Submit */}
                <button
                  onClick={handleAddSlot}
                  disabled={adding}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-semibold
                             hover:opacity-90 transition-opacity disabled:opacity-60
                             flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0B0C2A" }}
                >
                  {adding ? (
                    <>
                      <Spinner size={18} />
                      Adding…
                    </>
                  ) : (
                    "Add Slot"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ══ BOOKINGS TAB ═════════════════════════════════════════════════ */}
          {activeTab === "bookings" && (
            <BookingsTab
              selectedCoachId={selectedCoachId}
              slots={slots}
              onEditSlot={setEditSlot}
            />
          )}

        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {editSlot && (
        <EditSlotModal
          slot={editSlot}
          onSave={handleEditSave}
          onClose={() => setEditSlot(null)}
        />
      )}

      {deleteSlot && (
        <DeleteSlotModal
          slot={deleteSlot}
          bookings={mockBookings}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteSlot(null)}
          loading={deletingSlot}
        />
      )}
    </>
  );
}
