"use client";

import { useCoachAuth } from "@/lib/auth";
import DashboardPage from "@/components/coach/DashboardPage";

export default function CoachPage() {
  const ready = useCoachAuth();
  if (!ready) return null;
  return <DashboardPage />;
}
