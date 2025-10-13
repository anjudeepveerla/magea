"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";

/**
 * Optional client-side guard to avoid flicker on protected pages.
 * Middleware already protects server-side; this is a UX layer.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "unauthenticated") {
      const next = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.location.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [status, pathname, searchParams]);

  if (status === "unauthenticated") return null; // or a spinner/skeleton
  return <>{children}</>;
}
