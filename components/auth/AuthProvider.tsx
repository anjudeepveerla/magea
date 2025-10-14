"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type AuthUser = {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextType = {
  user: AuthUser | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
  initialUser: AuthUser | null; // from server (SSR) via cookie
};

export function AuthProvider({ children, initialUser }: Props) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [status, setStatus] = useState<AuthStatus>(initialUser ? "authenticated" : "unauthenticated");
  const loadingRef = useRef(false);

  const refresh = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      setStatus((s) => (s === "loading" ? s : s)); // no-op keep consistent
      const res = await fetch("/api/auth/me", { method: "GET", credentials: "same-origin", cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as { user: AuthUser };
        setUser(data.user);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        return { ok: false, message: data?.message || "Invalid credentials" };
      }
      await refresh(); // cookie is set by the API; this re-hydrates user
      return { ok: true };
    } catch {
      return { ok: false, message: "Login failed. Please try again." };
    }
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin", cache: "no-store" });
    } catch {
      // ignore
    } finally {
      setUser(null);
      setStatus("unauthenticated");
      // Hard navigate to ensure middleware + cookie state is synced.
      window.location.replace("/login");
    }
  }, []);

  // Keep session fresh when the tab regains focus or becomes visible
  useEffect(() => {
    const onFocus = () => refresh();
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  const value = useMemo<AuthContextType>(() => ({ user, status, login, logout, refresh }), [user, status, login, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
