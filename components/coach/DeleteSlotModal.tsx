"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { SESSION_LABELS, SESSION_COLORS } from "@/lib/constants";
import Spinner from "@/components/shared/Spinner";
import type { Slot, Booking, SessionType } from "@/lib/types";

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

// ─── Props ────────────────────────────────────────────────────────────────────

interface DeleteSlotModalProps {
  slot: Slot;
  bookings: Booking[];
  onConfirm: (action: "cancel-all" | "block-new") => void;
  onClose: () => void;
  loading?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DeleteSlotModal({
  slot,
  bookings,
  onConfirm,
  onClose,
  loading = false,
}: DeleteSlotModalProps) {
  const [action, setAction] = useState<"cancel-all" | "block-new">("block-new");

  // Only show confirmed bookings for this slot
  const slotBookings = bookings.filter(
    (b) => b.slotId === slot.id && b.status === "confirmed"
  );
  const hasBookings = slotBookings.length > 0;

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
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
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

          {/* Warning icon */}
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-red-600" />
          </div>

          {hasBookings ? (
            /* ── Slot has confirmed bookings ─────────────────────────────── */
            <>
              <h2 className="text-lg font-extrabold text-gray-900 mb-2">
                Warning: Existing Bookings Found
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                The slot on{" "}
                <strong className="text-gray-800">
                  {formatDate(slot.date)}, {slot.startTime} – {slot.endTime}
                </strong>{" "}
                has{" "}
                <strong className="text-gray-800">
                  {slotBookings.length} confirmed booking
                  {slotBookings.length !== 1 ? "s" : ""}
                </strong>
                . Please choose how to proceed:
              </p>

              {/* Booking list */}
              <div className="bg-red-50 border border-red-100 rounded-xl overflow-hidden divide-y divide-red-100 mb-5">
                {slotBookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 px-4 py-2.5">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0
                                  ${SESSION_COLORS[b.sessionType as SessionType]}`}
                    >
                      {SESSION_LABELS[b.sessionType as SessionType]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {b.clientName}
                      </p>
                      <p className="text-[11px] text-gray-500">+91 {b.clientPhone}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Radio options */}
              <div className="flex flex-col gap-3 mb-6">

                {/* Cancel all */}
                <label
                  className={[
                    "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors",
                    action === "cancel-all"
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-white hover:bg-gray-50",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="delete-action"
                    value="cancel-all"
                    checked={action === "cancel-all"}
                    onChange={() => setAction("cancel-all")}
                    className="mt-0.5 accent-red-600 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      Cancel all bookings &amp; delete slot
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      This will notify all members and permanently remove the session.
                    </p>
                  </div>
                </label>

                {/* Block new bookings */}
                <label
                  className={[
                    "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors",
                    action === "block-new"
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-white hover:bg-gray-50",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="delete-action"
                    value="block-new"
                    checked={action === "block-new"}
                    onChange={() => setAction("block-new")}
                    className="mt-0.5 accent-[#0B0C2A] shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      Block future bookings only
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Hides the slot for new users but maintains existing sessions for
                      confirmed members.
                    </p>
                  </div>
                </label>

              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                             text-sm font-semibold hover:bg-gray-50 transition-colors
                             disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onConfirm(action)}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-semibold
                             hover:opacity-90 transition-opacity disabled:opacity-60
                             flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0B0C2A" }}
                >
                  {loading ? <><Spinner size={16} /> Processing…</> : "Confirm Action"}
                </button>
              </div>
            </>
          ) : (
            /* ── No bookings — simple confirm ────────────────────────────── */
            <>
              <h2 className="text-lg font-extrabold text-gray-900 mb-2">
                Delete Slot?
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Are you sure you want to delete the slot on{" "}
                <strong className="text-gray-800">{formatDate(slot.date)}</strong> at{" "}
                <strong className="text-gray-800">
                  {slot.startTime} – {slot.endTime}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                             text-sm font-semibold hover:bg-gray-50 transition-colors
                             disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onConfirm("cancel-all")}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm
                             font-semibold hover:opacity-90 transition-opacity
                             disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <><Spinner size={16} /> Deleting…</> : "Delete Slot"}
                </button>
              </div>
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
}
