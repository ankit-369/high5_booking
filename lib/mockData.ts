import type { Coach, Slot, SlotBreakdown, Booking, Client } from "./types";

// ─── Coaches ─────────────────────────────────────────────────────────────────

export const mockCoaches: Coach[] = [
  { id: "c1", name: "Riya Sharma",  role: "Head Coach",       phone: "9876543210" },
  { id: "c2", name: "Arjun Mehta", role: "Physio Specialist", phone: "9876543211" },
  { id: "c3", name: "Priya Nair",  role: "Wellness Coach",    phone: "9876543212" },
];

// ─── Breakdown helper ─────────────────────────────────────────────────────────

function bd(
  t: [number, number], c: [number, number], p: [number, number],
  g: [number, number], a: [number, number]
): SlotBreakdown {
  return {
    trial:        { total: t[0], booked: t[1] },
    consultation: { total: c[0], booked: c[1] },
    physio:       { total: p[0], booked: p[1] },
    goalSetting:  { total: g[0], booked: g[1] },
    assessment:   { total: a[0], booked: a[1] },
  };
}

const BLOCKED = bd([0,0],[0,0],[0,0],[0,0],[0,0]);

// ─── Slots — 2 weeks (May 10–23 2026), 3 coaches ─────────────────────────────
//
// c1 Riya   → balanced, all session types
// c2 Arjun  → physio-heavy, consultation + trial support
// c3 Priya  → wellness: assessment & goal-setting heavy
//
// Status key: "active" | "blocked"

export const mockSlots: Slot[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 10 (Sunday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s101", coachId:"c1", date:"2026-05-10", startTime:"07:30 AM", endTime:"08:30 AM", status:"active",  breakdown: bd([3,1],[2,0],[2,0],[1,0],[2,1]) },
  { id:"s102", coachId:"c1", date:"2026-05-10", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([3,2],[2,1],[2,0],[1,1],[2,0]) },
  { id:"s103", coachId:"c1", date:"2026-05-10", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([2,0],[3,2],[1,1],[2,0],[1,0]) },
  { id:"s104", coachId:"c1", date:"2026-05-10", startTime:"02:00 PM", endTime:"03:00 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s105", coachId:"c1", date:"2026-05-10", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s106", coachId:"c2", date:"2026-05-10", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,1],[2,2],[4,2],[1,0],[2,1]) },
  { id:"s107", coachId:"c2", date:"2026-05-10", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([1,0],[2,1],[4,3],[1,1],[2,0]) },
  { id:"s108", coachId:"c2", date:"2026-05-10", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([2,2],[2,0],[3,1],[1,0],[2,2]) },
  { id:"s109", coachId:"c2", date:"2026-05-10", startTime:"04:00 PM", endTime:"05:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[5,2],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s110", coachId:"c3", date:"2026-05-10", startTime:"07:00 AM", endTime:"08:00 AM", status:"active",  breakdown: bd([2,1],[1,0],[1,0],[3,2],[3,1]) },
  { id:"s111", coachId:"c3", date:"2026-05-10", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,2],[1,1],[0,0],[3,3],[2,1]) },
  { id:"s112", coachId:"c3", date:"2026-05-10", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([2,0],[2,1],[1,1],[3,0],[3,2]) },
  { id:"s113", coachId:"c3", date:"2026-05-10", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,1],[2,1],[3,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 11 (Monday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s114", coachId:"c1", date:"2026-05-11", startTime:"07:00 AM", endTime:"08:00 AM", status:"active",  breakdown: bd([3,0],[2,0],[2,0],[1,0],[2,0]) },
  { id:"s115", coachId:"c1", date:"2026-05-11", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([3,2],[2,1],[2,1],[2,1],[1,0]) },
  { id:"s116", coachId:"c1", date:"2026-05-11", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([2,1],[2,2],[2,0],[2,0],[2,1]) },
  { id:"s117", coachId:"c1", date:"2026-05-11", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([3,3],[2,0],[2,2],[1,1],[2,0]) },
  { id:"s118", coachId:"c1", date:"2026-05-11", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s119", coachId:"c2", date:"2026-05-11", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,1],[2,0],[4,2],[1,0],[2,1]) },
  { id:"s120", coachId:"c2", date:"2026-05-11", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([1,1],[2,1],[4,4],[1,0],[2,0]) },
  { id:"s121", coachId:"c2", date:"2026-05-11", startTime:"12:30 PM", endTime:"01:30 PM", status:"active",  breakdown: bd([2,0],[2,2],[3,1],[1,1],[2,2]) },
  { id:"s122", coachId:"c2", date:"2026-05-11", startTime:"03:00 PM", endTime:"04:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[5,3],[1,0],[2,0]) },
  { id:"s123", coachId:"c2", date:"2026-05-11", startTime:"05:30 PM", endTime:"06:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[3,0],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s124", coachId:"c3", date:"2026-05-11", startTime:"08:30 AM", endTime:"09:30 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,1],[3,2]) },
  { id:"s125", coachId:"c3", date:"2026-05-11", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([2,1],[2,1],[1,0],[3,2],[2,1]) },
  { id:"s126", coachId:"c3", date:"2026-05-11", startTime:"01:00 PM", endTime:"02:00 PM", status:"active",  breakdown: bd([2,2],[1,0],[0,0],[3,3],[3,1]) },
  { id:"s127", coachId:"c3", date:"2026-05-11", startTime:"03:00 PM", endTime:"04:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,0],[2,0],[3,0]) },
  { id:"s128", coachId:"c3", date:"2026-05-11", startTime:"05:30 PM", endTime:"06:30 PM", status:"active",  breakdown: bd([2,0],[2,1],[1,1],[2,1],[2,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 12 (Tuesday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s129", coachId:"c1", date:"2026-05-12", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([3,1],[2,1],[2,0],[1,0],[2,0]) },
  { id:"s130", coachId:"c1", date:"2026-05-12", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([2,2],[2,0],[2,1],[2,1],[1,0]) },
  { id:"s131", coachId:"c1", date:"2026-05-12", startTime:"12:00 PM", endTime:"01:00 PM", status:"active",  breakdown: bd([3,0],[2,2],[2,0],[2,0],[2,2]) },
  { id:"s132", coachId:"c1", date:"2026-05-12", startTime:"03:00 PM", endTime:"04:00 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s133", coachId:"c1", date:"2026-05-12", startTime:"05:30 PM", endTime:"06:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s134", coachId:"c2", date:"2026-05-12", startTime:"08:30 AM", endTime:"09:30 AM", status:"active",  breakdown: bd([2,0],[2,1],[4,2],[1,0],[2,0]) },
  { id:"s135", coachId:"c2", date:"2026-05-12", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([1,1],[2,0],[4,3],[1,1],[2,2]) },
  { id:"s136", coachId:"c2", date:"2026-05-12", startTime:"12:30 PM", endTime:"01:30 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s137", coachId:"c2", date:"2026-05-12", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([2,1],[2,2],[3,1],[1,0],[2,1]) },

  // c3 – Priya
  { id:"s138", coachId:"c3", date:"2026-05-12", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,1],[1,1],[1,0],[3,2],[3,3]) },
  { id:"s139", coachId:"c3", date:"2026-05-12", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,1],[3,0],[2,1]) },
  { id:"s140", coachId:"c3", date:"2026-05-12", startTime:"01:00 PM", endTime:"02:00 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s141", coachId:"c3", date:"2026-05-12", startTime:"02:30 PM", endTime:"03:30 PM", status:"active",  breakdown: bd([1,0],[2,1],[2,0],[3,1],[2,0]) },
  { id:"s142", coachId:"c3", date:"2026-05-12", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[2,0],[3,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 13 (Wednesday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s143", coachId:"c1", date:"2026-05-13", startTime:"07:30 AM", endTime:"08:30 AM", status:"active",  breakdown: bd([3,2],[2,1],[2,0],[1,0],[2,1]) },
  { id:"s144", coachId:"c1", date:"2026-05-13", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,0],[2,2],[2,1],[2,2],[1,0]) },
  { id:"s145", coachId:"c1", date:"2026-05-13", startTime:"12:30 PM", endTime:"01:30 PM", status:"active",  breakdown: bd([3,1],[2,0],[2,0],[2,0],[2,0]) },
  { id:"s146", coachId:"c1", date:"2026-05-13", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([2,0],[2,1],[2,2],[1,1],[2,0]) },

  // c2 – Arjun
  { id:"s147", coachId:"c2", date:"2026-05-13", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,1],[2,0],[4,1],[1,0],[2,0]) },
  { id:"s148", coachId:"c2", date:"2026-05-13", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([1,0],[2,1],[4,4],[1,1],[2,1]) },
  { id:"s149", coachId:"c2", date:"2026-05-13", startTime:"02:30 PM", endTime:"03:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[3,2],[1,0],[2,0]) },
  { id:"s150", coachId:"c2", date:"2026-05-13", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[4,1],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s151", coachId:"c3", date:"2026-05-13", startTime:"07:30 AM", endTime:"08:30 AM", status:"active",  breakdown: bd([2,1],[1,0],[1,0],[3,2],[3,2]) },
  { id:"s152", coachId:"c3", date:"2026-05-13", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([2,0],[2,1],[1,1],[3,1],[2,0]) },
  { id:"s153", coachId:"c3", date:"2026-05-13", startTime:"12:30 PM", endTime:"01:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[0,0],[3,0],[3,1]) },
  { id:"s154", coachId:"c3", date:"2026-05-13", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([2,2],[1,1],[2,1],[2,2],[2,1]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 14 (Thursday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s155", coachId:"c1", date:"2026-05-14", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([3,1],[2,0],[2,0],[1,0],[2,0]) },
  { id:"s156", coachId:"c1", date:"2026-05-14", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([2,2],[2,2],[2,1],[2,1],[2,0]) },
  { id:"s157", coachId:"c1", date:"2026-05-14", startTime:"01:00 PM", endTime:"02:00 PM", status:"active",  breakdown: bd([3,0],[2,1],[2,0],[2,0],[2,1]) },
  { id:"s158", coachId:"c1", date:"2026-05-14", startTime:"04:00 PM", endTime:"05:00 PM", status:"active",  breakdown: bd([2,1],[2,0],[2,2],[1,0],[2,0]) },

  // c2 – Arjun
  { id:"s159", coachId:"c2", date:"2026-05-14", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,0],[2,1],[4,2],[1,0],[2,0]) },
  { id:"s160", coachId:"c2", date:"2026-05-14", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([1,1],[2,0],[4,3],[1,1],[2,2]) },
  { id:"s161", coachId:"c2", date:"2026-05-14", startTime:"01:00 PM", endTime:"02:00 PM", status:"active",  breakdown: bd([2,0],[2,2],[3,0],[1,0],[2,0]) },
  { id:"s162", coachId:"c2", date:"2026-05-14", startTime:"04:00 PM", endTime:"05:00 PM", status:"active",  breakdown: bd([1,0],[2,1],[5,3],[1,0],[2,1]) },

  // c3 – Priya
  { id:"s163", coachId:"c3", date:"2026-05-14", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,1],[3,2]) },
  { id:"s164", coachId:"c3", date:"2026-05-14", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([2,1],[2,0],[1,1],[3,2],[2,0]) },
  { id:"s165", coachId:"c3", date:"2026-05-14", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([1,0],[2,1],[2,0],[3,3],[3,1]) },
  { id:"s166", coachId:"c3", date:"2026-05-14", startTime:"04:00 PM", endTime:"05:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[2,0],[2,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 15 (Friday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s167", coachId:"c1", date:"2026-05-15", startTime:"07:00 AM", endTime:"08:00 AM", status:"active",  breakdown: bd([3,2],[2,1],[2,0],[1,0],[2,1]) },
  { id:"s168", coachId:"c1", date:"2026-05-15", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },
  { id:"s169", coachId:"c1", date:"2026-05-15", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([3,1],[2,2],[2,1],[2,1],[1,0]) },
  { id:"s170", coachId:"c1", date:"2026-05-15", startTime:"02:30 PM", endTime:"03:30 PM", status:"active",  breakdown: bd([2,2],[2,0],[2,2],[1,1],[2,0]) },
  { id:"s171", coachId:"c1", date:"2026-05-15", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([2,0],[2,1],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s172", coachId:"c2", date:"2026-05-15", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,1],[2,0],[4,1],[1,0],[2,0]) },
  { id:"s173", coachId:"c2", date:"2026-05-15", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([1,0],[2,2],[4,3],[1,1],[2,0]) },
  { id:"s174", coachId:"c2", date:"2026-05-15", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([2,0],[2,1],[3,2],[1,0],[2,1]) },
  { id:"s175", coachId:"c2", date:"2026-05-15", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([1,1],[2,0],[5,4],[1,0],[2,0]) },
  { id:"s176", coachId:"c2", date:"2026-05-15", startTime:"06:00 PM", endTime:"07:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[3,0],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s177", coachId:"c3", date:"2026-05-15", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,1],[1,0],[1,0],[3,2],[3,1]) },
  { id:"s178", coachId:"c3", date:"2026-05-15", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,0],[2,1],[1,0],[3,0],[2,0]) },
  { id:"s179", coachId:"c3", date:"2026-05-15", startTime:"12:00 PM", endTime:"01:00 PM", status:"active",  breakdown: bd([1,1],[2,0],[2,1],[3,3],[3,2]) },
  { id:"s180", coachId:"c3", date:"2026-05-15", startTime:"02:00 PM", endTime:"03:00 PM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[2,1],[3,0]) },
  { id:"s181", coachId:"c3", date:"2026-05-15", startTime:"05:30 PM", endTime:"06:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[2,0],[2,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 16 (Saturday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s182", coachId:"c1", date:"2026-05-16", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([3,1],[2,1],[2,1],[1,0],[2,0]) },
  { id:"s183", coachId:"c1", date:"2026-05-16", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,1],[2,2]) },
  { id:"s184", coachId:"c1", date:"2026-05-16", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s185", coachId:"c2", date:"2026-05-16", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,1],[2,0],[4,2],[1,0],[2,1]) },
  { id:"s186", coachId:"c2", date:"2026-05-16", startTime:"12:00 PM", endTime:"01:00 PM", status:"active",  breakdown: bd([1,0],[2,1],[3,3],[1,0],[2,0]) },
  { id:"s187", coachId:"c2", date:"2026-05-16", startTime:"03:00 PM", endTime:"04:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[4,1],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s188", coachId:"c3", date:"2026-05-16", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,1],[3,0]) },
  { id:"s189", coachId:"c3", date:"2026-05-16", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([2,1],[2,0],[1,0],[3,2],[2,1]) },
  { id:"s190", coachId:"c3", date:"2026-05-16", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,0],[2,0],[3,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 17 (Sunday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s191", coachId:"c1", date:"2026-05-17", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([3,0],[2,0],[2,0],[1,0],[2,0]) },
  { id:"s192", coachId:"c1", date:"2026-05-17", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([2,1],[2,1],[2,0],[2,0],[1,0]) },
  { id:"s193", coachId:"c1", date:"2026-05-17", startTime:"02:00 PM", endTime:"03:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s194", coachId:"c2", date:"2026-05-17", startTime:"08:30 AM", endTime:"09:30 AM", status:"active",  breakdown: bd([2,0],[2,0],[4,1],[1,0],[2,0]) },
  { id:"s195", coachId:"c2", date:"2026-05-17", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([1,0],[2,1],[4,2],[1,0],[2,1]) },
  { id:"s196", coachId:"c2", date:"2026-05-17", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[3,0],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s197", coachId:"c3", date:"2026-05-17", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,0],[3,0]) },
  { id:"s198", coachId:"c3", date:"2026-05-17", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([2,1],[2,0],[1,0],[3,1],[2,0]) },
  { id:"s199", coachId:"c3", date:"2026-05-17", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,0],[2,0],[3,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 18 (Monday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s200", coachId:"c1", date:"2026-05-18", startTime:"07:30 AM", endTime:"08:30 AM", status:"active",  breakdown: bd([3,1],[2,0],[2,0],[1,0],[2,0]) },
  { id:"s201", coachId:"c1", date:"2026-05-18", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,2],[2,1],[2,1],[2,0],[1,0]) },
  { id:"s202", coachId:"c1", date:"2026-05-18", startTime:"12:00 PM", endTime:"01:00 PM", status:"active",  breakdown: bd([3,0],[2,2],[2,0],[2,1],[2,0]) },
  { id:"s203", coachId:"c1", date:"2026-05-18", startTime:"03:30 PM", endTime:"04:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s204", coachId:"c2", date:"2026-05-18", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,1],[2,0],[4,2],[1,0],[2,0]) },
  { id:"s205", coachId:"c2", date:"2026-05-18", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([1,0],[2,2],[4,3],[1,1],[2,1]) },
  { id:"s206", coachId:"c2", date:"2026-05-18", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([2,0],[2,1],[3,1],[1,0],[2,0]) },
  { id:"s207", coachId:"c2", date:"2026-05-18", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[5,2],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s208", coachId:"c3", date:"2026-05-18", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,0],[3,0]) },
  { id:"s209", coachId:"c3", date:"2026-05-18", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([2,1],[2,0],[1,1],[3,1],[2,1]) },
  { id:"s210", coachId:"c3", date:"2026-05-18", startTime:"01:00 PM", endTime:"02:00 PM", status:"active",  breakdown: bd([1,0],[2,1],[2,0],[3,2],[3,0]) },
  { id:"s211", coachId:"c3", date:"2026-05-18", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[2,0],[2,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 19 (Tuesday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s212", coachId:"c1", date:"2026-05-19", startTime:"07:00 AM", endTime:"08:00 AM", status:"active",  breakdown: bd([3,2],[2,1],[2,0],[1,0],[2,1]) },
  { id:"s213", coachId:"c1", date:"2026-05-19", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },
  { id:"s214", coachId:"c1", date:"2026-05-19", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([3,1],[2,2],[2,1],[2,0],[1,0]) },
  { id:"s215", coachId:"c1", date:"2026-05-19", startTime:"01:30 PM", endTime:"02:30 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s216", coachId:"c1", date:"2026-05-19", startTime:"04:00 PM", endTime:"05:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s217", coachId:"c2", date:"2026-05-19", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,0],[2,1],[4,1],[1,0],[2,0]) },
  { id:"s218", coachId:"c2", date:"2026-05-19", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([1,1],[2,0],[4,2],[1,0],[2,1]) },
  { id:"s219", coachId:"c2", date:"2026-05-19", startTime:"12:30 PM", endTime:"01:30 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s220", coachId:"c2", date:"2026-05-19", startTime:"03:00 PM", endTime:"04:00 PM", status:"active",  breakdown: bd([2,0],[2,2],[3,2],[1,1],[2,0]) },

  // c3 – Priya
  { id:"s221", coachId:"c3", date:"2026-05-19", startTime:"07:30 AM", endTime:"08:30 AM", status:"active",  breakdown: bd([2,1],[1,0],[1,0],[3,1],[3,2]) },
  { id:"s222", coachId:"c3", date:"2026-05-19", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,0],[2,1],[1,0],[3,0],[2,0]) },
  { id:"s223", coachId:"c3", date:"2026-05-19", startTime:"01:30 PM", endTime:"02:30 PM", status:"blocked", breakdown: BLOCKED },
  { id:"s224", coachId:"c3", date:"2026-05-19", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,0],[2,0],[3,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 20 (Wednesday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s225", coachId:"c1", date:"2026-05-20", startTime:"07:00 AM", endTime:"08:00 AM", status:"active",  breakdown: bd([3,0],[2,0],[2,0],[1,0],[2,0]) },
  { id:"s226", coachId:"c1", date:"2026-05-20", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,1],[2,1],[2,0],[2,1],[2,0]) },
  { id:"s227", coachId:"c1", date:"2026-05-20", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([3,2],[2,0],[2,2],[2,0],[1,1]) },
  { id:"s228", coachId:"c1", date:"2026-05-20", startTime:"02:30 PM", endTime:"03:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s229", coachId:"c2", date:"2026-05-20", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,1],[2,0],[4,2],[1,0],[2,0]) },
  { id:"s230", coachId:"c2", date:"2026-05-20", startTime:"11:30 AM", endTime:"12:30 PM", status:"active",  breakdown: bd([1,0],[2,1],[3,3],[1,0],[2,1]) },
  { id:"s231", coachId:"c2", date:"2026-05-20", startTime:"02:00 PM", endTime:"03:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[5,2],[1,0],[2,0]) },
  { id:"s232", coachId:"c2", date:"2026-05-20", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[4,0],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s233", coachId:"c3", date:"2026-05-20", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,1],[3,0]) },
  { id:"s234", coachId:"c3", date:"2026-05-20", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([2,1],[2,1],[1,0],[3,2],[2,0]) },
  { id:"s235", coachId:"c3", date:"2026-05-20", startTime:"02:30 PM", endTime:"03:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,1],[2,0],[3,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 21 (Thursday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s236", coachId:"c1", date:"2026-05-21", startTime:"08:30 AM", endTime:"09:30 AM", status:"active",  breakdown: bd([3,1],[2,1],[2,0],[1,0],[2,0]) },
  { id:"s237", coachId:"c1", date:"2026-05-21", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([2,0],[2,0],[2,1],[2,1],[2,0]) },
  { id:"s238", coachId:"c1", date:"2026-05-21", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([3,2],[2,2],[2,0],[2,0],[1,1]) },
  { id:"s239", coachId:"c1", date:"2026-05-21", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s240", coachId:"c2", date:"2026-05-21", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,0],[2,1],[4,1],[1,0],[2,0]) },
  { id:"s241", coachId:"c2", date:"2026-05-21", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([1,1],[2,0],[4,3],[1,1],[2,2]) },
  { id:"s242", coachId:"c2", date:"2026-05-21", startTime:"01:00 PM", endTime:"02:00 PM", status:"active",  breakdown: bd([2,0],[2,2],[3,2],[1,0],[2,0]) },
  { id:"s243", coachId:"c2", date:"2026-05-21", startTime:"04:30 PM", endTime:"05:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[5,1],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s244", coachId:"c3", date:"2026-05-21", startTime:"08:30 AM", endTime:"09:30 AM", status:"active",  breakdown: bd([2,1],[1,1],[1,0],[3,2],[3,1]) },
  { id:"s245", coachId:"c3", date:"2026-05-21", startTime:"10:00 AM", endTime:"11:00 AM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[3,0],[2,0]) },
  { id:"s246", coachId:"c3", date:"2026-05-21", startTime:"01:30 PM", endTime:"02:30 PM", status:"active",  breakdown: bd([1,0],[2,1],[2,1],[2,1],[3,2]) },
  { id:"s247", coachId:"c3", date:"2026-05-21", startTime:"05:30 PM", endTime:"06:30 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[2,0],[2,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 22 (Friday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s248", coachId:"c1", date:"2026-05-22", startTime:"07:00 AM", endTime:"08:00 AM", status:"active",  breakdown: bd([3,1],[2,0],[2,0],[1,0],[2,1]) },
  { id:"s249", coachId:"c1", date:"2026-05-22", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,2],[2,2],[2,1],[2,0],[1,0]) },
  { id:"s250", coachId:"c1", date:"2026-05-22", startTime:"12:00 PM", endTime:"01:00 PM", status:"active",  breakdown: bd([3,0],[2,1],[2,0],[2,2],[2,0]) },

  // c2 – Arjun
  { id:"s251", coachId:"c2", date:"2026-05-22", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([2,0],[2,0],[4,2],[1,0],[2,0]) },
  { id:"s252", coachId:"c2", date:"2026-05-22", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([1,0],[2,1],[3,3],[1,0],[2,1]) },
  { id:"s253", coachId:"c2", date:"2026-05-22", startTime:"02:00 PM", endTime:"03:00 PM", status:"active",  breakdown: bd([2,1],[2,0],[4,2],[1,1],[2,0]) },

  // c3 – Priya
  { id:"s254", coachId:"c3", date:"2026-05-22", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,1],[1,0],[1,0],[3,2],[3,0]) },
  { id:"s255", coachId:"c3", date:"2026-05-22", startTime:"12:00 PM", endTime:"01:00 PM", status:"active",  breakdown: bd([2,0],[2,1],[1,0],[3,1],[2,2]) },
  { id:"s256", coachId:"c3", date:"2026-05-22", startTime:"03:00 PM", endTime:"04:00 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,1],[2,0],[3,1]) },
  { id:"s257", coachId:"c3", date:"2026-05-22", startTime:"05:00 PM", endTime:"06:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[1,0],[2,0],[2,0]) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAY 23 (Saturday)
  // ══════════════════════════════════════════════════════════════════════════

  // c1 – Riya
  { id:"s258", coachId:"c1", date:"2026-05-23", startTime:"09:00 AM", endTime:"10:00 AM", status:"active",  breakdown: bd([3,1],[2,0],[2,0],[1,0],[2,0]) },
  { id:"s259", coachId:"c1", date:"2026-05-23", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([2,0],[2,1],[2,0],[2,0],[1,0]) },
  { id:"s260", coachId:"c1", date:"2026-05-23", startTime:"03:00 PM", endTime:"04:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[2,0],[2,0],[2,0]) },

  // c2 – Arjun
  { id:"s261", coachId:"c2", date:"2026-05-23", startTime:"08:00 AM", endTime:"09:00 AM", status:"active",  breakdown: bd([2,0],[2,0],[4,1],[1,0],[2,0]) },
  { id:"s262", coachId:"c2", date:"2026-05-23", startTime:"10:30 AM", endTime:"11:30 AM", status:"active",  breakdown: bd([1,0],[2,1],[3,2],[1,0],[2,0]) },
  { id:"s263", coachId:"c2", date:"2026-05-23", startTime:"02:00 PM", endTime:"03:00 PM", status:"active",  breakdown: bd([2,0],[2,0],[4,0],[1,0],[2,0]) },

  // c3 – Priya
  { id:"s264", coachId:"c3", date:"2026-05-23", startTime:"09:30 AM", endTime:"10:30 AM", status:"active",  breakdown: bd([2,0],[1,0],[1,0],[3,0],[3,1]) },
  { id:"s265", coachId:"c3", date:"2026-05-23", startTime:"11:00 AM", endTime:"12:00 PM", status:"active",  breakdown: bd([2,1],[2,0],[1,0],[3,1],[2,0]) },
  { id:"s266", coachId:"c3", date:"2026-05-23", startTime:"02:30 PM", endTime:"03:30 PM", status:"active",  breakdown: bd([1,0],[2,0],[2,0],[2,0],[3,0]) },
];

// ─── Clients (members) ────────────────────────────────────────────────────────

export const mockClients: Client[] = [
  { id: "cl1", name: "Aarav Patel",   phone: "9000000001", email: "aarav@example.com",  dob: "1995-03-12", gender: "male",   isMember: true },
  { id: "cl2", name: "Meera Joshi",   phone: "9000000002", email: "meera@example.com",  dob: "1990-07-22", gender: "female", isMember: true },
  { id: "cl3", name: "Karan Verma",   phone: "9000000005", email: "karan@example.com",  dob: "1992-06-18", gender: "male",   isMember: true },
  { id: "cl4", name: "Divya Nambiar", phone: "9000000006", email: "divya@example.com",  dob: "2000-09-14", gender: "female", isMember: true },
];

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const mockBookings: Booking[] = [
  // May 10 – Riya
  { id:"b1",  slotId:"s102", coachId:"c1", clientName:"Aarav Patel",   clientPhone:"9000000001", clientEmail:"aarav@example.com",  clientDob:"1995-03-12", clientGender:"male",   sessionType:"trial",        status:"confirmed",   createdAt:"2026-05-01T09:00Z" },
  { id:"b2",  slotId:"s103", coachId:"c1", clientName:"Meera Joshi",   clientPhone:"9000000002", clientEmail:"meera@example.com",  clientDob:"1990-07-22", clientGender:"female", sessionType:"consultation", status:"confirmed",   createdAt:"2026-05-01T11:00Z" },
  // May 10 – Arjun
  { id:"b3",  slotId:"s106", coachId:"c2", clientName:"Rohit Desai",   clientPhone:"9000000003", clientEmail:"rohit@example.com",  clientDob:"1988-11-05", clientGender:"male",   sessionType:"physio",       status:"confirmed",   createdAt:"2026-05-01T08:30Z" },
  { id:"b4",  slotId:"s107", coachId:"c2", clientName:"Sneha Iyer",    clientPhone:"9000000004", clientEmail:"sneha@example.com",  clientDob:"1997-01-30", clientGender:"female", sessionType:"physio",       status:"cancelled",   createdAt:"2026-05-01T10:00Z" },
  // May 10 – Priya
  { id:"b5",  slotId:"s110", coachId:"c3", clientName:"Karan Verma",   clientPhone:"9000000005", clientEmail:"karan@example.com",  clientDob:"1992-06-18", clientGender:"male",   sessionType:"goal-setting", status:"confirmed",   createdAt:"2026-05-02T10:00Z" },
  { id:"b6",  slotId:"s111", coachId:"c3", clientName:"Divya Nambiar", clientPhone:"9000000006", clientEmail:"divya@example.com",  clientDob:"2000-09-14", clientGender:"female", sessionType:"assessment",   status:"confirmed",   createdAt:"2026-05-02T11:00Z" },
  // May 11 – Riya
  { id:"b7",  slotId:"s115", coachId:"c1", clientName:"Farhan Sheikh",  clientPhone:"9100000001", clientEmail:"farhan@example.com", clientDob:"1993-04-20", clientGender:"male",   sessionType:"trial",        status:"confirmed",   createdAt:"2026-05-03T09:00Z" },
  { id:"b8",  slotId:"s116", coachId:"c1", clientName:"Ananya Rao",     clientPhone:"9100000002", clientEmail:"ananya@example.com", clientDob:"1998-08-15", clientGender:"female", sessionType:"consultation", status:"confirmed",   createdAt:"2026-05-03T10:00Z" },
  // May 11 – Arjun
  { id:"b9",  slotId:"s120", coachId:"c2", clientName:"Vikram Shetty",  clientPhone:"9100000003", clientEmail:"vikram@example.com", clientDob:"1985-12-01", clientGender:"male",   sessionType:"physio",       status:"confirmed",   createdAt:"2026-05-03T09:30Z" },
  { id:"b10", slotId:"s121", coachId:"c2", clientName:"Preethi Kumar",  clientPhone:"9100000004", clientEmail:"preethi@example.com",clientDob:"1994-03-22", clientGender:"female", sessionType:"assessment",   status:"transferred", createdAt:"2026-05-03T11:00Z" },
  // May 11 – Priya
  { id:"b11", slotId:"s125", coachId:"c3", clientName:"Rahul Nair",     clientPhone:"9100000005", clientEmail:"rahul@example.com",  clientDob:"1991-07-09", clientGender:"male",   sessionType:"goal-setting", status:"confirmed",   createdAt:"2026-05-03T10:30Z" },
  { id:"b12", slotId:"s126", coachId:"c3", clientName:"Sanjana Pillai", clientPhone:"9100000006", clientEmail:"sanjana@example.com",clientDob:"1996-11-28", clientGender:"female", sessionType:"assessment",   status:"confirmed",   createdAt:"2026-05-03T13:00Z" },
  // May 14 – mixed
  { id:"b13", slotId:"s156", coachId:"c1", clientName:"Aarav Patel",    clientPhone:"9000000001", clientEmail:"aarav@example.com",  clientDob:"1995-03-12", clientGender:"male",   sessionType:"consultation", status:"confirmed",   createdAt:"2026-05-05T09:00Z" },
  { id:"b14", slotId:"s160", coachId:"c2", clientName:"Meera Joshi",    clientPhone:"9000000002", clientEmail:"meera@example.com",  clientDob:"1990-07-22", clientGender:"female", sessionType:"physio",       status:"confirmed",   createdAt:"2026-05-05T10:00Z" },
  { id:"b15", slotId:"s164", coachId:"c3", clientName:"Karan Verma",    clientPhone:"9000000005", clientEmail:"karan@example.com",  clientDob:"1992-06-18", clientGender:"male",   sessionType:"goal-setting", status:"confirmed",   createdAt:"2026-05-05T11:00Z" },
];
