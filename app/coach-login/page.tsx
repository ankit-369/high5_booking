"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OtpModal from "@/components/shared/OtpModal";
import { STORAGE_KEY } from "@/lib/auth";

export default function CoachLoginPage() {
  const router = useRouter();
  const [otpOpen, setOtpOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      router.replace("/coach");
    }
  }, [router]);

  function handleVerified(phone: string) {
    const raw = phone.replace("+91", "");
    localStorage.setItem(STORAGE_KEY, raw);
    router.replace("/coach");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4
                 bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">

        {/* Logo mark */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#0B0C2A" }}
        >
          <span className="text-white text-2xl font-black tracking-tight">H5</span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Coach Login</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Access your slot management dashboard.
        </p>

        <button
          onClick={() => setOtpOpen(true)}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm
                     hover:opacity-90 active:opacity-80 transition-opacity"
          style={{ backgroundColor: "#0B0C2A" }}
        >
          Login with OTP →
        </button>

        <p className="text-xs text-gray-400 mt-5">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>

      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={handleVerified}
        mode="login"
      />
    </div>
  );
}
