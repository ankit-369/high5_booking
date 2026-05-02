"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  MessageSquare,
  Activity,
  Target,
  ClipboardList,
  ArrowRight,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import OtpModal from "@/components/shared/OtpModal";
import type { SessionType } from "@/lib/types";

// ─── Programme card data ──────────────────────────────────────────────────────

interface Programme {
  id: SessionType;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  href: string;
  membersOnly: boolean;
  highlighted: boolean;
}

const PROGRAMMES: Programme[] = [
  {
    id: "trial",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Trial Session",
    description:
      "Begin with a complimentary session to experience our coaching approach first-hand. No commitment, no pressure.",
    href: "/book/trial",
    membersOnly: false,
    highlighted: false,
  },
  {
    id: "consultation",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    title: "Expert Consultation",
    description:
      "A focused 1-on-1 with our specialists to map your health journey and craft a personalised programme.",
    href: "/book/consultation",
    membersOnly: false,
    highlighted: true,
  },
  {
    id: "physio",
    icon: Activity,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Physio Session",
    description:
      "Targeted physiotherapy for injury recovery, mobility improvement, and long-term movement health.",
    href: "/book/physio",
    membersOnly: false,
    highlighted: false,
  },
  {
    id: "goal-setting",
    icon: Target,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    title: "Goal Setting Session",
    description:
      "Structured planning to define milestones and build a clear, achievable roadmap to your goals.",
    href: "/book/goal-setting",
    membersOnly: true,
    highlighted: false,
  },
  {
    id: "assessment",
    icon: ClipboardList,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Fitness Assessment",
    description:
      "Comprehensive fitness and body composition analysis to benchmark where you are and track real progress.",
    href: "/book/assessment",
    membersOnly: true,
    highlighted: false,
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────���─

export default function LandingPage() {
  const router = useRouter();

  const [otpOpen, setOtpOpen]         = useState(false);
  const [otpMode, setOtpMode]         = useState<"login" | "booking">("login");
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  function openMemberLogin() {
    setOtpMode("login");
    setPendingRoute("/member");
    setOtpOpen(true);
  }

  function openBookingOtp(href: string) {
    setOtpMode("booking");
    setPendingRoute(href);
    setOtpOpen(true);
  }

  function handleVerified() {
    setOtpOpen(false);
    if (pendingRoute) {
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  }

  return (
    <>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100 min-h-[88vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full text-center">

          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-gray-400 block" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-500">
              High5{" "}
              <span style={{ color: "#7AC143" }}>PERFORMANCE</span>
            </span>
            <span className="h-px w-8 bg-gray-400 block" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
            Where The Body Meets
            <br />
            <span style={{ color: "#EF4444" }}>Its True Potential.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Elite coaching, science-led programmes, and personalised care —
            designed to help every body perform at its best.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book/trial"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full
                         bg-gray-900 text-white text-sm font-semibold
                         hover:bg-gray-700 transition-colors shadow-md"
            >
              Book A Free Trial
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={openMemberLogin}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full
                         border border-gray-300 text-gray-600 text-sm font-semibold
                         hover:border-gray-500 hover:text-gray-900 transition-colors bg-white/60"
            >
              Already A Member
            </button>
          </div>

        </div>
      </section>

      {/* ── PROGRAMMES ────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: "#7AC143" }}
              >
                Our Programmes
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Science-led,{" "}
                <span className="text-gray-400">human-centred.</span>
              </h2>
            </div>

            <button
              onClick={openMemberLogin}
              className="text-sm text-gray-500 hover:text-gray-900 underline
                         underline-offset-2 transition-colors shrink-0 self-start sm:self-auto"
            >
              Already a member? Login to access all sessions
            </button>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMMES.map((prog) => (
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
        </div>
      </section>

      {/* OTP modal */}
      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={handleVerified}
        mode={otpMode}
      />
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
      className={[
        "flex flex-col bg-white rounded-2xl p-6 transition-shadow hover:shadow-lg",
        p.highlighted
          ? "border-2 ring-0 shadow-md"
          : "border border-gray-100 shadow-sm",
      ].join(" ")}
      style={
        p.highlighted
          ? { borderColor: "#7AC143" }
          : undefined
      }
    >
      {/* Highlighted badge */}
      {p.highlighted && (
        <span
          className="self-start mb-3 text-[10px] font-bold tracking-widest uppercase
                     px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: "#7AC143" }}
        >
          Featured
        </span>
      )}

      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${p.iconBg}`}
      >
        <Icon size={20} className={p.iconColor} />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.description}</p>

      {/* Divider */}
      <div className="h-px bg-gray-100 my-5" />

      {/* Footer */}
      <div className="flex items-center justify-between gap-3">
        {p.membersOnly && (
          <span className="flex items-center gap-1.5 text-[11px] font-semibold
                           text-amber-700 bg-amber-50 border border-amber-200
                           px-2.5 py-1 rounded-full">
            <Lock size={11} />
            Members Only
          </span>
        )}

        <button
          onClick={onBookNow}
          className={[
            "flex items-center gap-1.5 text-sm font-semibold transition-colors",
            p.highlighted
              ? "text-green-700 hover:text-green-900"
              : "text-gray-700 hover:text-gray-900",
            p.membersOnly ? "ml-auto" : "",
          ].join(" ")}
        >
          Book Now
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}
