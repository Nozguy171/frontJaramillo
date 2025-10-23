"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getEmail, clearAuth } from "@/lib/authStorage";

export default function UserBadge() {
  const pathname = usePathname();
  const router = useRouter();

  const hide = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getEmail());
    setMounted(true);
  }, []);

  if (hide) return null;

  if (!mounted) return null;

  const onLogout = () => {
    clearAuth();
    router.replace("/login");
  };

  return (
    <div
      className="fixed left-3 bottom-3 z-50"
      suppressHydrationWarning
    >
      <div className="flex items-center gap-2 rounded-full bg-black/80 text-white px-3 py-2 shadow-lg">
        <span className="text-xs md:text-sm truncate max-w-[180px]" title={email || ""}>
          {email || "Invitado"}
        </span>
        <button
          onClick={onLogout}
          className="text-xs md:text-sm bg-white/10 hover:bg-white/20 rounded px-2 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
