import type { Coach, Slot, Booking } from "./types";

// ─── Coaches ────────────────────────────────────────────────────────────────

export const mockCoaches: Coach[] = [
  { id: "c1", name: "Riya Sharma",  role: "Head Coach",        phone: "9876543210" },
  { id: "c2", name: "Arjun Mehta", role: "Physio Specialist",  phone: "9876543211" },
  { id: "c3", name: "Priya Nair",  role: "Wellness Coach",     phone: "9876543212" },
];

// ─── Slots (8 per coach, across 3 dates) ────────────────────────────────────

export const mockSlots: Slot[] = [
  // ── Riya Sharma (c1) ──────────────────────────────────────────────────────
  {
    id: "s1", coachId: "c1", date: "2026-05-10",
    startTime: "09:00 AM", endTime: "10:00 AM", status: "active",
    breakdown: { trial: { total: 3, booked: 2 }, consultation: { total: 2, booked: 1 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 1, booked: 1 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s2", coachId: "c1", date: "2026-05-10",
    startTime: "11:00 AM", endTime: "12:00 PM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 3, booked: 2 }, physio: { total: 1, booked: 1 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 1, booked: 0 } },
  },
  {
    id: "s3", coachId: "c1", date: "2026-05-10",
    startTime: "02:00 PM", endTime: "03:00 PM", status: "blocked",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 0 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s4", coachId: "c1", date: "2026-05-12",
    startTime: "09:00 AM", endTime: "10:00 AM", status: "active",
    breakdown: { trial: { total: 3, booked: 1 }, consultation: { total: 2, booked: 2 }, physio: { total: 2, booked: 1 }, goalSetting: { total: 1, booked: 0 }, assessment: { total: 2, booked: 2 } },
  },
  {
    id: "s5", coachId: "c1", date: "2026-05-12",
    startTime: "11:00 AM", endTime: "12:00 PM", status: "active",
    breakdown: { trial: { total: 2, booked: 2 }, consultation: { total: 2, booked: 0 }, physio: { total: 3, booked: 1 }, goalSetting: { total: 2, booked: 1 }, assessment: { total: 1, booked: 0 } },
  },
  {
    id: "s6", coachId: "c1", date: "2026-05-14",
    startTime: "10:00 AM", endTime: "11:00 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 1 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 2, booked: 2 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s7", coachId: "c1", date: "2026-05-14",
    startTime: "01:00 PM", endTime: "02:00 PM", status: "active",
    breakdown: { trial: { total: 3, booked: 1 }, consultation: { total: 1, booked: 0 }, physio: { total: 2, booked: 2 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 2, booked: 1 } },
  },
  {
    id: "s8", coachId: "c1", date: "2026-05-14",
    startTime: "03:00 PM", endTime: "04:00 PM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 0 }, physio: { total: 1, booked: 1 }, goalSetting: { total: 2, booked: 1 }, assessment: { total: 2, booked: 0 } },
  },

  // ── Arjun Mehta (c2) ──────────────────────────────────────────────────────
  {
    id: "s9", coachId: "c2", date: "2026-05-10",
    startTime: "09:00 AM", endTime: "10:00 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 1 }, consultation: { total: 2, booked: 2 }, physio: { total: 3, booked: 2 }, goalSetting: { total: 1, booked: 0 }, assessment: { total: 2, booked: 1 } },
  },
  {
    id: "s10", coachId: "c2", date: "2026-05-10",
    startTime: "11:00 AM", endTime: "12:00 PM", status: "active",
    breakdown: { trial: { total: 3, booked: 0 }, consultation: { total: 2, booked: 1 }, physio: { total: 2, booked: 2 }, goalSetting: { total: 2, booked: 1 }, assessment: { total: 1, booked: 0 } },
  },
  {
    id: "s11", coachId: "c2", date: "2026-05-10",
    startTime: "02:00 PM", endTime: "03:00 PM", status: "active",
    breakdown: { trial: { total: 2, booked: 2 }, consultation: { total: 2, booked: 0 }, physio: { total: 2, booked: 1 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 2, booked: 2 } },
  },
  {
    id: "s12", coachId: "c2", date: "2026-05-12",
    startTime: "09:30 AM", endTime: "10:30 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 3, booked: 1 }, physio: { total: 3, booked: 3 }, goalSetting: { total: 1, booked: 1 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s13", coachId: "c2", date: "2026-05-12",
    startTime: "12:00 PM", endTime: "01:00 PM", status: "blocked",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 0 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s14", coachId: "c2", date: "2026-05-12",
    startTime: "02:00 PM", endTime: "03:00 PM", status: "active",
    breakdown: { trial: { total: 3, booked: 1 }, consultation: { total: 2, booked: 2 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 2, booked: 2 }, assessment: { total: 1, booked: 0 } },
  },
  {
    id: "s15", coachId: "c2", date: "2026-05-14",
    startTime: "10:00 AM", endTime: "11:00 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 1 }, consultation: { total: 2, booked: 0 }, physio: { total: 3, booked: 2 }, goalSetting: { total: 2, booked: 1 }, assessment: { total: 2, booked: 2 } },
  },
  {
    id: "s16", coachId: "c2", date: "2026-05-14",
    startTime: "03:00 PM", endTime: "04:00 PM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 1 }, physio: { total: 2, booked: 1 }, goalSetting: { total: 1, booked: 0 }, assessment: { total: 2, booked: 0 } },
  },

  // ── Priya Nair (c3) ───────────────────────────────────────────────────────
  {
    id: "s17", coachId: "c3", date: "2026-05-10",
    startTime: "09:00 AM", endTime: "10:00 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 2 }, consultation: { total: 2, booked: 1 }, physio: { total: 1, booked: 0 }, goalSetting: { total: 3, booked: 2 }, assessment: { total: 2, booked: 1 } },
  },
  {
    id: "s18", coachId: "c3", date: "2026-05-10",
    startTime: "11:00 AM", endTime: "12:00 PM", status: "active",
    breakdown: { trial: { total: 3, booked: 1 }, consultation: { total: 2, booked: 2 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 2, booked: 2 }, assessment: { total: 1, booked: 1 } },
  },
  {
    id: "s19", coachId: "c3", date: "2026-05-10",
    startTime: "03:00 PM", endTime: "04:00 PM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 0 }, physio: { total: 2, booked: 1 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 3, booked: 2 } },
  },
  {
    id: "s20", coachId: "c3", date: "2026-05-12",
    startTime: "09:00 AM", endTime: "10:00 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 1 }, consultation: { total: 3, booked: 0 }, physio: { total: 2, booked: 2 }, goalSetting: { total: 2, booked: 1 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s21", coachId: "c3", date: "2026-05-12",
    startTime: "01:00 PM", endTime: "02:00 PM", status: "blocked",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 0 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 2, booked: 0 } },
  },
  {
    id: "s22", coachId: "c3", date: "2026-05-12",
    startTime: "03:00 PM", endTime: "04:00 PM", status: "active",
    breakdown: { trial: { total: 3, booked: 2 }, consultation: { total: 2, booked: 1 }, physio: { total: 2, booked: 0 }, goalSetting: { total: 1, booked: 1 }, assessment: { total: 2, booked: 1 } },
  },
  {
    id: "s23", coachId: "c3", date: "2026-05-14",
    startTime: "09:30 AM", endTime: "10:30 AM", status: "active",
    breakdown: { trial: { total: 2, booked: 0 }, consultation: { total: 2, booked: 2 }, physio: { total: 3, booked: 1 }, goalSetting: { total: 2, booked: 0 }, assessment: { total: 2, booked: 2 } },
  },
  {
    id: "s24", coachId: "c3", date: "2026-05-14",
    startTime: "02:00 PM", endTime: "03:00 PM", status: "active",
    breakdown: { trial: { total: 3, booked: 1 }, consultation: { total: 2, booked: 0 }, physio: { total: 2, booked: 2 }, goalSetting: { total: 2, booked: 2 }, assessment: { total: 1, booked: 0 } },
  },
];

// ─── Bookings (6, varied types & statuses) ──────────────────────────────────

export const mockBookings: Booking[] = [
  {
    id: "b1", slotId: "s1", coachId: "c1",
    clientName: "Aarav Patel",     clientPhone: "9000000001",
    clientEmail: "aarav@example.com", clientDob: "1995-03-12",
    clientGender: "male", sessionType: "trial",
    status: "confirmed", createdAt: "2026-05-01T09:15:00Z",
  },
  {
    id: "b2", slotId: "s2", coachId: "c1",
    clientName: "Meera Joshi",     clientPhone: "9000000002",
    clientEmail: "meera@example.com", clientDob: "1990-07-22",
    clientGender: "female", sessionType: "consultation",
    status: "confirmed", createdAt: "2026-05-01T11:00:00Z",
  },
  {
    id: "b3", slotId: "s9", coachId: "c2",
    clientName: "Rohit Desai",     clientPhone: "9000000003",
    clientEmail: "rohit@example.com", clientDob: "1988-11-05",
    clientGender: "male", sessionType: "physio",
    status: "cancelled", createdAt: "2026-05-02T08:30:00Z",
  },
  {
    id: "b4", slotId: "s12", coachId: "c2",
    clientName: "Sneha Iyer",      clientPhone: "9000000004",
    clientEmail: "sneha@example.com", clientDob: "1997-01-30",
    clientGender: "female", sessionType: "assessment",
    status: "transferred", createdAt: "2026-05-02T14:45:00Z",
  },
  {
    id: "b5", slotId: "s17", coachId: "c3",
    clientName: "Karan Verma",     clientPhone: "9000000005",
    clientEmail: "karan@example.com", clientDob: "1992-06-18",
    clientGender: "male", sessionType: "goal-setting",
    status: "confirmed", createdAt: "2026-05-03T10:00:00Z",
  },
  {
    id: "b6", slotId: "s22", coachId: "c3",
    clientName: "Divya Nambiar",   clientPhone: "9000000006",
    clientEmail: "divya@example.com", clientDob: "2000-09-14",
    clientGender: "female", sessionType: "trial",
    status: "cancelled", createdAt: "2026-05-03T16:20:00Z",
  },
];
