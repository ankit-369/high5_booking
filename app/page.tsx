"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap, MessageSquare, Activity, Target, ClipboardList,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
// import OtpModal from "@/components/shared/OtpModal";
import type { SessionType } from "@/lib/types";

// ─── Programme data ────────────────────────────────────────────────────────────

interface Programme {
  id: SessionType;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  membersOnly: boolean;
}

const PROGRAMMES: Programme[] = [
  {
    id: "trial",
    icon: Zap,
    title: "Trial Session",
    description:
      "Begin with a complimentary session to experience our coaching approach first-hand. No commitment, no pressure.",
    href: "/book/trial",
    membersOnly: false,
  },
  {
    id: "consultation",
    icon: MessageSquare,
    title: "Expert Consultation",
    description:
      "A focused 1-on-1 with our specialists to map your health journey and craft a personalised programme.",
    href: "/book/consultation",
    membersOnly: false,
  },
  {
    id: "physio",
    icon: Activity,
    title: "Physio Session",
    description:
      "Targeted physiotherapy for injury recovery, mobility improvement, and long-term movement health.",
    href: "/book/physio",
    membersOnly: false,
  },
  {
    id: "goal-setting",
    icon: Target,
    title: "Goal Setting Session",
    description:
      "Structured planning to define milestones and build a clear, achievable roadmap to your goals.",
    href: "/book/goal-setting",
    membersOnly: true,
  },
  {
    id: "assessment",
    icon: ClipboardList,
    title: "Fitness Assessment",
    description:
      "Comprehensive fitness and body composition analysis to benchmark where you are and track real progress.",
    href: "/book/assessment",
    membersOnly: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const router = useRouter();

  // const [otpOpen, setOtpOpen]           = useState(false);
  // const [otpMode, setOtpMode]           = useState<"login" | "booking">("login");
  // const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  function openMemberLogin() {
    // setOtpMode("login");
  router.push("/member");
    // setOtpOpen(true);
  }

function openBookingOtp(href: string) {
  router.push(href);
}



  return (
    <>
      <Navbar />

      {/* ── Ticker strip (landing page only) ──────────────────────────────── */}
      {/* <div
        className="h-9 overflow-hidden flex items-center border-b border-white/10"
        style={{ backgroundColor: "#0B0C2A" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.2em] uppercase px-6"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              PERFORMANCE LAB · PHYSIO THERAPY · LONGEVITY PROTOCOL · GROUP SANCTUARIES · PERFORMANCE LAB · PHYSIO THERAPY · LONGEVITY PROTOCOL · GROUP SANCTUARIES ·&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div> */}

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section
        className="w-full min-h-[90vh] flex items-center justify-center px-4 text-center"
        style={{ backgroundColor: "#0B0C2A" }}
      >
        <div className="max-w-3xl w-full py-20">

          {/* Label + underline */}
          <p
            className="text-sm font-medium tracking-[0.3em] uppercase mb-2"
            style={{ color: "#FF4F3C" }}
          >
            HIGH5 PERFORMANCE
          </p>
          <div className="w-12 h-px mx-auto mb-8" style={{ backgroundColor: "#FF4F3C" }} />

          {/* Heading */}
          <h1 className="font-bold leading-tight tracking-tight text-white text-5xl md:text-7xl">
            Where The Body Meets
            <br />
            <span style={{ color: "#FF4F3C" }}>Its True Potential.</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Elite coaching, science-led programmes, and personalised care —
            designed to help every body perform at its best.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/book/trial"
              className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300
                         border text-white hover:bg-white hover:text-[#0B0C2A]"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
            >
              Book A Free Trial →
            </Link>

            <button
              onClick={openMemberLogin}
              className="text-sm underline underline-offset-4 transition-colors self-center"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              Already A Member
            </button>
          </div>

        </div>
      </section>

      {/* ══ PROGRAMMES ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F5F5F7" }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#FF4F3C" }}
              >
                Our Programmes
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: "#0B0C2A" }}
              >
                Science-led,{" "}
                <span className="font-light" style={{ color: "#6E6E73" }}>
                  human-centred.
                </span>
              </h2>
            </div>

            <button
              onClick={openMemberLogin}
              className="text-sm shrink-0 self-start sm:self-auto transition-colors"
              style={{ color: "#6E6E73" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#0B0C2A"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#6E6E73"; }}
            >
              Already a member?{" "}
              <span className="underline underline-offset-2">
                Login to access all sessions
              </span>{" "}
              →
            </button>
          </div>

          {/* Cards — top row: 3, bottom row: 2 centered */}
          <div className="flex flex-col gap-5">

            {/* Top 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {PROGRAMMES.slice(0, 3).map((prog) => (
                <ProgrammeCard
                  key={prog.id}
                  programme={prog}
                  onBookNow={() =>
                    prog.membersOnly
                      ? openBookingOtp(prog.href)
                      : router.push(prog.href)
                  }
                />
              ))}
            </div>

            {/* Bottom 2 — centred under top row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* <div className="hidden sm:block" aria-hidden /> */}
              {PROGRAMMES.slice(3).map((prog) => (
                <ProgrammeCard
                  key={prog.id}
                  programme={prog}
                  onBookNow={() => openBookingOtp(prog.href)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* OTP modal */}
      {/* <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={handleVerified}
        mode={otpMode}
      /> */}
    </>
  );
}

// ─── Programme card ───────────────────────────────────────────────────────────

function ProgrammeCard({
  programme: p,
  onBookNow,
}: {
  programme: Programme;
  onBookNow: () => void;
}) {
  const Icon = p.icon;

  return (
    <article
      className="flex flex-col bg-white rounded-2xl p-6 border cursor-pointer
                 transition-all duration-250
                 hover:border-[#0B0C2A] hover:shadow-lg hover:scale-[1.01]"
      style={{ borderColor: "#E5E5EA", boxShadow: undefined }}
      onClick={onBookNow}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
        style={{ backgroundColor: "#FFF0EE" }}
      >
        <Icon size={18} style={{ color: "#FF4F3C" }} />
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "#0B0C2A" }}
      >
        {p.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "#6E6E73" }}
      >
        {p.description}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-5 flex items-center justify-between gap-3 border-t border-[#E5E5EA] mt-5">
        {p.membersOnly ? (
          <span
            className="text-xs font-medium"
            style={{ color: "#FF4F3C" }}
          >
            Members Only
          </span>
        ) : (
          <span />
        )}

        <span
          className="text-sm font-medium transition-colors group-hover:text-[#FF4F3C]"
          style={{ color: "#0B0C2A" }}
        >
          Book Now →
        </span>
      </div>
    </article>
  );
}
