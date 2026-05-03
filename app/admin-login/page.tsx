"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import OtpModal from "@/components/shared/OtpModal";
import { STORAGE_KEY } from "@/lib/auth";
import { ADMIN_PHONES } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [otpOpen, setOtpOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ADMIN_PHONES.includes(stored)) {
      router.replace("/admin");
    }
  }, [router]);

  function handleVerified(phone: string) {
    const raw = phone.replace("+91", "");
    if (!ADMIN_PHONES.includes(raw)) {
      setAccessDenied(true);
      return;
    }
    localStorage.setItem(STORAGE_KEY, raw);
    router.replace("/admin");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4
                 bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5
                     bg-yellow-100"
        >
          <ShieldCheck size={28} className="text-yellow-700" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Admin Login</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Super admin access only. Your number must be authorised.
        </p>

        {accessDenied && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5 text-left">
            <p className="text-sm font-semibold text-red-700">Access denied</p>
            <p className="text-xs text-red-500 mt-0.5">
              This number is not registered as an admin.
            </p>
          </div>
        )}

        <button
          onClick={() => { setAccessDenied(false); setOtpOpen(true); }}
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
