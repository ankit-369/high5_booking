import type { SessionType } from "./types";
import { mockCoaches } from "./mockData";

export const BRAND_COLORS = {
  primary: "#1E3A8A",
  accent:  "#7AC143",
  danger:  "#EF4444",
  warning: "#F97316",
  muted:   "#6B7280",
} as const;

export const SESSION_LABELS: Record<SessionType, string> = {
  "trial":        "Trial Session",
  "consultation": "Consultation",
  "physio":       "Physio Session",
  "goal-setting": "Goal Setting",
  "assessment":   "Assessment",
};

// Tailwind badge classes — bg + text pair for use in className
export const SESSION_COLORS: Record<SessionType, string> = {
  "trial":        "bg-blue-100 text-blue-700",
  "consultation": "bg-purple-100 text-purple-700",
  "physio":       "bg-green-100 text-green-700",
  "goal-setting": "bg-yellow-100 text-yellow-800",
  "assessment":   "bg-orange-100 text-orange-700",
};

export const COACHES = mockCoaches;

export const ADMIN_PHONES: string[] = [
  "9999999999", // Jeel
];
