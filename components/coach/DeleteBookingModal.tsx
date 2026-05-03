"use client";

import { X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import type { Booking, SessionType } from "@/lib/types";
import { SESSION_LABELS, SESSION_COLORS } from "@/lib/constants";

interface DeleteBookingModalProps {
  booking: Booking;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteBookingModal({
  booking,
  onConfirm,
  onClose,
}: DeleteBookingModalProps) {
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
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={22} className="text-red-600" />
          </div>

          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Cancel Booking?</h2>

          <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {booking.clientName}
              </p>
              <p className="text-xs text-gray-500">+91 {booking.clientPhone}</p>
            </div>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0
                          ${SESSION_COLORS[booking.sessionType as SessionType]}`}
            >
              {SESSION_LABELS[booking.sessionType as SessionType]}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            This will permanently cancel the booking. The client will be
            notified and the slot will be freed up.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                         text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Keep Booking
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm
                         font-semibold hover:opacity-90 transition-opacity"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
