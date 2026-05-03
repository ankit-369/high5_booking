"use client";

import { useAdminAuth } from "@/lib/auth";
import DashboardPage from "@/components/coach/DashboardPage";

export default function AdminPage() {
  const ready = useAdminAuth();
  if (!ready) return null;
  return <DashboardPage isAdmin />;
}
