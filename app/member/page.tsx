"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, ClipboardList, ArrowRight } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import PageWrapper from "@/components/shared/PageWrapper";
import OtpModal from "@/components/shared/OtpModal";
import { mockClients } from "@/lib/mockData";
import type { Client } from "@/lib/types";

export default function MemberPage() {
  const router = useRouter();

  const [otpOpen, setOtpOpen] = useState(true);
  const [client, setClient]   = useState<Client | null>(null);
  const [notFound, setNotFound] = useState(false);

  function handleVerified(phone: string) {
    const rawPhone = phone.replace("+91", "");
    const found = mockClients.find((c) => c.phone === rawPhone) ?? null;
    setOtpOpen(false);
    if (found) {
      setClient(found);
    } else {
      setNotFound(true);
    }
  }

  return (
    <>
      <Navbar />

      <PageWrapper maxWidth="max-w-2xl" cardClassName="p-6 sm:p-8">

        {/* ── Not a member ───────────────────────────────────────────────── */}
        {notFound && (
          <div className="text-center py-8">
            <p className="text-gray-700 font-semibold mb-1">No account found</p>
            <p className="text-sm text-gray-400 mb-6">
              That number isn&apos;t registered as a member. Contact us to join.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { setNotFound(false); setOtpOpen(true); }}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold
                           hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0B0C2A" }}
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600
                           text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Go Home
              </a>
            </div>
          </div>
        )}

        {/* ── Closed modal without verifying ─────────────────────────────── */}
        {!client && !notFound && !otpOpen && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-6">
              Please verify your mobile number to access your member dashboard.
            </p>
            <button
              onClick={() => setOtpOpen(true)}
              className="px-6 py-3 rounded-xl text-white text-sm font-semibold
                         hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#0B0C2A" }}
            >
              Verify Number
            </button>
          </div>
        )}

        {/* ── Member dashboard ───────────────────────────────────────────── */}
        {client && (
          <>
            {/* Welcome header */}
            <div className="mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Member Dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Welcome back, {client.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {client.email} · +91 {client.phone}
              </p>
            </div>

            {/* Section label */}
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Book a Session
            </p>

            {/* Two option cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Goal Setting */}
              <div className="flex flex-col bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center mb-4 shrink-0">
                  <Target size={20} className="text-yellow-700" />
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-2">
                  Goal Setting Session
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  Structured planning to define milestones and build a clear,
                  achievable roadmap to your goals.
                </p>
                <button
                  onClick={() => router.push(`/book/goal-setting?phone=${client.phone}`)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3
                             rounded-xl text-white text-sm font-semibold
                             hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#7AC143" }}
                >
                  Book Now
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Fitness Assessment */}
              <div className="flex flex-col bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4 shrink-0">
                  <ClipboardList size={20} className="text-orange-600" />
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-2">
                  Fitness Assessment
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  Comprehensive fitness and body composition analysis to benchmark
                  where you are and track real progress.
                </p>
                <button
                  onClick={() => router.push(`/book/assessment?phone=${client.phone}`)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3
                             rounded-xl text-white text-sm font-semibold
                             hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#7AC143" }}
                >
                  Book Now
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          </>
        )}

      </PageWrapper>

      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={handleVerified}
        mode="login"
      />
    </>
  );
}
