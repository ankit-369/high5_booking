"use client";

import { useState } from "react";
import { X, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { mockCoaches } from "@/lib/mockData";
import type { Booking } from "@/lib/types";

interface ChangeCoachModalProps {
  booking: Booking;
  currentCoachId: string;
  onConfirm: (newCoachId: string) => void;
  onClose: () => void;
}

export default function ChangeCoachModal({
  booking,
  currentCoachId,
  onConfirm,
  onClose,
}: ChangeCoachModalProps) {
  const otherCoaches = mockCoaches.filter((c) => c.id !== currentCoachId);
  const [newCoachId, setNewCoachId] = useState(otherCoaches[0]?.id ?? "");

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
        className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-7">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
            <ArrowLeftRight size={22} className="text-yellow-700" />
          </div>

          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Change Coach</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            Transfer{" "}
            <strong className="text-gray-800">{booking.clientName}</strong>&apos;s
            booking to a different coach:
          </p>

          {otherCoaches.length === 0 ? (
            <p className="text-sm text-gray-400 italic mb-5">
              No other coaches available to transfer to.
            </p>
          ) : (
            <div className="mb-6">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                New Coach
              </label>
              <select
                value={newCoachId}
                onChange={(e) => setNewCoachId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                           text-gray-900 text-sm outline-none cursor-pointer
                           focus:border-[#0B0C2A] focus:bg-white transition-colors"
              >
                {otherCoaches.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.role}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                         text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => newCoachId && onConfirm(newCoachId)}
              disabled={!newCoachId}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold
                         hover:opacity-90 transition-opacity disabled:opacity-40"
              style={{ backgroundColor: "#0B0C2A" }}
            >
              Transfer Booking
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
