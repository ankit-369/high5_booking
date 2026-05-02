"use client";

import {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { X } from "lucide-react";

export interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (phone: string) => void;
  mode: "login" | "booking";
}

type Step = "phone" | "otp";

const COUNTDOWN_START = 45;

export default function OtpModal({ isOpen, onClose, onVerified, mode }: OtpModalProps) {
  const [step, setStep]       = useState<Step>("phone");
  const [phone, setPhone]     = useState("");
  const [digits, setDigits]   = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [error, setError]     = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown — decrements every second while on OTP step
  useEffect(() => {
    if (step !== "otp" || countdown === 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  // Focus first OTP box when step changes
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => inputRefs.current[0]?.focus(), 80);
    }
  }, [step]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setPhone("");
      setDigits(["", "", "", ""]);
      setCountdown(COUNTDOWN_START);
      setError("");
    }
  }, [isOpen]);

  function handleSendOtp() {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setStep("otp");
    setCountdown(COUNTDOWN_START);
  }

  function handleDigitChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    setError("");
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setDigits(pasted.split(""));
      inputRefs.current[3]?.focus();
      e.preventDefault();
    }
  }

  function handleResend() {
    if (countdown > 0) return;
    setDigits(["", "", "", ""]);
    setError("");
    setCountdown(COUNTDOWN_START);
    setTimeout(() => inputRefs.current[0]?.focus(), 80);
  }

  // Mock verification — any complete 4-digit code passes
  function handleVerify() {
    if (digits.some((d) => d === "")) {
      setError("Enter all 4 digits");
      return;
    }
    onVerified("+91" + phone.replace(/\D/g, ""));
  }

  if (!isOpen) return null;

  const subtitle =
    mode === "login"
      ? "Enter your registered mobile number to log in."
      : "We'll send a verification code to confirm your booking.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* ── PHONE STEP ─────────────────────────────────────────── */}
          {step === "phone" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Verify your number
              </h2>
              <p className="text-sm text-gray-500 mb-7">{subtitle}</p>

              {/* Phone input */}
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="flex items-stretch bg-gray-100 rounded-xl overflow-hidden mb-4">
                <div className="flex items-center px-4 text-sm font-semibold text-gray-700 border-r border-gray-300 select-none bg-gray-100 shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                  className="flex-1 bg-transparent px-4 py-3.5 text-gray-900 text-base
                             placeholder:text-gray-400 outline-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 mb-3">{error}</p>
              )}

              <button
                onClick={handleSendOtp}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm
                           tracking-wide transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: "#1E3A8A" }}
              >
                Send OTP →
              </button>
            </>
          )}

          {/* ── OTP STEP ───────────────────────────────────────────── */}
          {step === "otp" && (
            <>
              <button
                onClick={() => { setStep("phone"); setError(""); }}
                className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
              >
                ← Change number
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Enter OTP
              </h2>
              <p className="text-sm text-gray-500 mb-7">
                Code sent to{" "}
                <span className="font-semibold text-gray-700">
                  +91 {phone}
                </span>
              </p>

              {/* 4 digit boxes */}
              <div className="flex justify-center gap-3 mb-6">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className="w-14 h-14 text-center text-xl font-bold text-gray-900
                               border-2 rounded-xl outline-none transition-colors
                               border-gray-200 focus:border-[#1E3A8A] bg-gray-50
                               focus:bg-white caret-transparent"
                  />
                ))}
              </div>

              {error && (
                <p className="text-xs text-red-500 mb-3 text-center">{error}</p>
              )}

              <button
                onClick={handleVerify}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm
                           tracking-wide transition-opacity hover:opacity-90 active:opacity-80 mb-4"
                style={{ backgroundColor: "#7AC143" }}
              >
                🔒 Verify Securely
              </button>

              {/* Resend countdown */}
              <p className="text-center text-xs text-gray-500">
                {countdown > 0 ? (
                  <>
                    Didn&apos;t receive code?{" "}
                    <span className="font-semibold text-gray-600">
                      Resend in {countdown}s
                    </span>
                  </>
                ) : (
                  <>
                    Didn&apos;t receive code?{" "}
                    <button
                      onClick={handleResend}
                      className="font-semibold text-[#1E3A8A] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
