export type SessionType =
  | "trial"
  | "consultation"
  | "physio"
  | "goal-setting"
  | "assessment";

export interface Coach {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  phone: string;
}

export interface SlotBreakdown {
  trial:        { total: number; booked: number };
  consultation: { total: number; booked: number };
  physio:       { total: number; booked: number };
  goalSetting:  { total: number; booked: number };
  assessment:   { total: number; booked: number };
}

export interface Slot {
  id: string;
  coachId: string;
  date: string;       // "YYYY-MM-DD"
  startTime: string;  // "09:00 AM"
  endTime: string;    // "10:00 AM"
  breakdown: SlotBreakdown;
  status: "active" | "blocked";
}

export interface Booking {
  id: string;
  slotId: string;
  coachId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientDob: string;
  clientGender: "male" | "female" | "other";
  sessionType: SessionType;
  status: "confirmed" | "cancelled" | "transferred";
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  isMember: boolean;
}

export interface OtpState {
  phone: string;
  otp: string;
  isVerified: boolean;
  expiresAt: number; // unix ms
}

export interface NavLink {
  label: string;
  href: string;
}
