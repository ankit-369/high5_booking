import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_PHONES } from "./constants";

export const STORAGE_KEY = "h5_coach_phone";

/**
 * Returns true once localStorage is read and the user is authenticated as a coach.
 * Redirects to /coach-login if no phone is stored.
 */
export function useCoachAuth(): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const phone = localStorage.getItem(STORAGE_KEY);
    if (!phone) {
      router.replace("/coach-login");
    } else {
      setReady(true);
    }
  }, [router]);

  return ready;
}

/**
 * Returns true once localStorage is read and the user is authenticated as an admin.
 * Redirects to /admin-login if phone is missing or not in ADMIN_PHONES.
 */
export function useAdminAuth(): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const phone = localStorage.getItem(STORAGE_KEY);
    if (!phone || !ADMIN_PHONES.includes(phone)) {
      router.replace("/admin-login");
    } else {
      setReady(true);
    }
  }, [router]);

  return ready;
}
