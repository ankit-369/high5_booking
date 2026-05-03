"use client";

import { X, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import type { Booking } from "@/lib/types";

interface AddAsMemberModalProps {
  booking: Booking;
  onConfirm: () => void;
  onClose: () => void;
}

export default function AddAsMemberModal({
  booking,
  onConfirm,
  onClose,
}: AddAsMemberModalProps) {
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
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <UserPlus size={22} className="text-blue-600" />
          </div>

          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Add As Member</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Grant{" "}
            <strong className="text-gray-800">{booking.clientName}</strong>{" "}
            membership access? They&apos;ll be able to book Goal Setting and
            Fitness Assessment sessions.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                         text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold
                         hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#0B0C2A" }}
            >
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
