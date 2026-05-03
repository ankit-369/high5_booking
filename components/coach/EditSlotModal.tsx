"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mockBookings } from "@/lib/mockData";
import { SESSION_LABELS } from "@/lib/constants";
import type { Slot, SessionType } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BREAKDOWN_FIELDS: { key: keyof Slot["breakdown"]; label: string }[] = [
  { key: "trial",        label: "Trial" },
  { key: "consultation", label: "Consultation" },
  { key: "physio",       label: "Physio" },
  { key: "goalSetting",  label: "Goal Setting" },
  { key: "assessment",   label: "Assessment" },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditSlotModalProps {
  slot: Slot;
  onSave: (updated: Slot) => void;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditSlotModal({ slot, onSave, onClose }: EditSlotModalProps) {
  // Totals are editable; booked counts are read-only minimums from the slot
  const [totals, setTotals] = useState<Record<keyof Slot["breakdown"], number>>({
    trial:        slot.breakdown.trial.total,
    consultation: slot.breakdown.consultation.total,
    physio:       slot.breakdown.physio.total,
    goalSetting:  slot.breakdown.goalSetting.total,
    assessment:   slot.breakdown.assessment.total,
  });

  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);

  // Derive bookings for this slot from mock data (confirmed only)
  const slotBookings = mockBookings.filter(
    (b) => b.slotId === slot.id && b.status === "confirmed"
  );
  const firstBooking = slotBookings[0];

  function handleChange(key: keyof Slot["breakdown"], raw: string) {
    const minVal = slot.breakdown[key].booked;
    const v = Math.max(minVal, parseInt(raw, 10) || minVal);
    setTotals((prev) => ({ ...prev, [key]: v }));
  }

  function handleSave() {
    const updated: Slot = {
      ...slot,
      breakdown: {
        trial:        { ...slot.breakdown.trial,        total: totals.trial },
        consultation: { ...slot.breakdown.consultation, total: totals.consultation },
        physio:       { ...slot.breakdown.physio,       total: totals.physio },
        goalSetting:  { ...slot.breakdown.goalSetting,  total: totals.goalSetting },
        assessment:   { ...slot.breakdown.assessment,   total: totals.assessment },
      },
    };
    onSave(updated);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">

          {/* Header */}
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">Edit Slot</h2>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            Adjust slot counts (e.g. for walk-in bookings). Booked slots can&apos;t be
            reduced below current bookings.
          </p>

          {/* Warning row — shown only if the slot has confirmed bookings */}
          {firstBooking && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle size={14} className="text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {firstBooking.clientName}
                </p>
                <p className="text-[11px] text-gray-500">
                  +91 {firstBooking.clientPhone} · {slot.startTime} – {slot.endTime}
                </p>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200 shrink-0 whitespace-nowrap">
                {SESSION_LABELS[firstBooking.sessionType as SessionType]}
              </span>
            </div>
          )}

          {/* Total slots — read only, auto-updates */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
              Total Slots
            </label>
            <input
              type="number"
              readOnly
              value={grandTotal}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100
                         text-gray-600 text-sm outline-none cursor-default select-none"
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-5" />

          {/* Breakdown inputs */}
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            Slot Breakdown{" "}
            <span className="normal-case font-normal text-gray-400">
              (Manually adjust for walk-ins)
            </span>
          </p>

          <div className="grid grid-cols-2 gap-3 mb-7">
            {BREAKDOWN_FIELDS.map(({ key, label }) => {
              const booked = slot.breakdown[key].booked;
              return (
                <div key={key}>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                    {label}{" "}
                    <span className="font-normal text-gray-400 normal-case">
                      (Booked: {booked})
                    </span>
                  </label>
                  <input
                    type="number"
                    min={booked}
                    value={totals[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                               text-gray-900 text-sm outline-none
                               focus:border-[#0B0C2A] focus:bg-white transition-colors"
                  />
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                         text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold
                         hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#0B0C2A" }}
            >
              Save Changes
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
