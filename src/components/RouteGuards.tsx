"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearAuth } from "@/lib/authStorage";
import { meRequest } from "@/lib/api";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const run = async () => {
      const t = getToken();
      if (!t) { router.replace("/login"); return; }
      try {
        await meRequest(); 
        setOk(true);
      } catch {
        clearAuth();
        router.replace("/login");
      }
    };
    run();
  }, [router]);

  if (!ok) return <div className="p-6">Cargando…</div>;
  return <>{children}</>;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const run = async () => {
      const t = getToken();
      if (!t) { setOk(true); return; }
      try {
        await meRequest();
        router.replace("/segment");
      } catch {
        setOk(true);
      }
    };
    run();
  }, [router]);

  if (!ok) return <div className="p-6">Cargando…</div>;
  return <>{children}</>;
}
