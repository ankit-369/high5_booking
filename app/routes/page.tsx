import Link from "next/link";
import {
  Globe, Users, ShieldCheck, ChevronRight,
  Zap, MessageSquare, Activity, Target, ClipboardList,
  LayoutDashboard, LogIn,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "public",
    label: "Public",
    sublabel: "No login needed",
    icon: Globe,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    pillBg: "bg-blue-50",
    pillText: "text-blue-700",
    routes: [
      {
        path: "/book/trial",
        icon: Zap,
        title: "Trial Session",
        desc: "First-time visitors. 3-step form + phone OTP.",
      },
      {
        path: "/book/consultation",
        icon: MessageSquare,
        title: "Consultation",
        desc: "Open to everyone. Discuss goals with a coach.",
      },
      {
        path: "/book/physio",
        icon: Activity,
        title: "Physio Session",
        desc: "Open to everyone. Book a physio appointment.",
      },
    ],
  },
  {
    id: "member",
    label: "Members",
    sublabel: "OTP verifies identity",
    icon: Users,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    pillBg: "bg-green-50",
    pillText: "text-green-700",
    routes: [
      {
        path: "/member",
        icon: Users,
        title: "Member Dashboard",
        desc: 'Start here. Tap "Already A Member?" on the home page → OTP → dashboard.',
        highlight: true,
      },
      {
        path: "/book/goal-setting",
        icon: Target,
        title: "Goal Setting",
        desc: "Members only. Reached via the member dashboard — form is pre-filled.",
      },
      {
        path: "/book/assessment",
        icon: ClipboardList,
        title: "Fitness Assessment",
        desc: "Members only. Reached via the member dashboard — form is pre-filled.",
      },
    ],
    note: "Registered phones: 9000000001 · 9000000002 · 9000000005 · 9000000006",
  },
  {
    id: "coach",
    label: "Coaches",
    sublabel: "Login required",
    icon: LayoutDashboard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    pillBg: "bg-purple-50",
    pillText: "text-purple-700",
    routes: [
      {
        path: "/coach-login",
        icon: LogIn,
        title: "Coach Login",
        desc: "Enter phone + any 4-digit OTP. Session stays active in browser.",
        highlight: true,
      },
      {
        path: "/coach",
        icon: LayoutDashboard,
        title: "Coach Dashboard",
        desc: "Manage slots (All Slots / Add Slot / Bookings). Auto-redirects here after login.",
      },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    sublabel: "Authorised number only",
    icon: ShieldCheck,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    pillBg: "bg-yellow-50",
    pillText: "text-yellow-700",
    routes: [
      {
        path: "/admin-login",
        icon: LogIn,
        title: "Admin Login",
        desc: "Phone must be registered as admin. Use 9999999999.",
        highlight: true,
      },
      {
        path: "/admin",
        icon: ShieldCheck,
        title: "Super Admin Dashboard",
        desc: "Same as coach dashboard but can manage all coaches. Admin badge shown.",
      },
    ],
    note: "Admin phone: 9999999999",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100">
      <div className="max-w-lg mx-auto px-4 py-10 pb-16">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400
                       hover:text-gray-600 transition-colors mb-5"
          >
            ← Home
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Route Guide
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Where to go and who can access it.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.id}>

                {/* Section header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${section.iconBg}`}>
                    <SectionIcon size={16} className={section.iconColor} />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-gray-900">
                      {section.label}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {section.sublabel}
                    </span>
                  </div>
                </div>

                {/* Route cards */}
                <div className="flex flex-col gap-2">
                  {section.routes.map((route) => {
                    const RouteIcon = route.icon;
                    return (
                      <Link
                        key={route.path}
                        href={route.path}
                        className={[
                          "flex items-start gap-3 px-4 py-3.5 rounded-2xl border transition-all",
                          "hover:shadow-sm active:scale-[0.99]",
                          route.highlight
                            ? "bg-white border-gray-200 shadow-sm"
                            : "bg-white/70 border-gray-100",
                        ].join(" ")}
                      >
                        {/* Icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${section.iconBg}`}>
                          <RouteIcon size={16} className={section.iconColor} />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-gray-900">
                              {route.title}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${section.pillBg} ${section.pillText}`}>
                              {route.path}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                            {route.desc}
                          </p>
                        </div>

                        {/* Arrow */}
                        <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1" />
                      </Link>
                    );
                  })}
                </div>

                {/* Section note */}
                {section.note && (
                  <p className={`text-[11px] font-semibold mt-2 px-1 ${section.pillText ?? "text-gray-500"}`}>
                    {section.note}
                  </p>
                )}

              </div>
            );
          })}
        </div>

        {/* Quick nav cheatsheet */}
        <div className="mt-8 bg-gray-900 rounded-2xl p-5">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Quick Start
          </p>
          <div className="flex flex-col gap-3">
            {[
              { who: "Walk-in client",   path: "/book/trial" },
              { who: "Existing member",  path: "/ → Already A Member?" },
              { who: "Coach",            path: "/coach-login" },
              { who: "Admin",            path: "/admin-login  (ph: 9999999999)" },
            ].map(({ who, path }) => (
              <div key={who} className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-gray-400 shrink-0">{who}</span>
                <span className="text-xs font-mono text-gray-200 text-right">{path}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
