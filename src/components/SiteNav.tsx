"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { getToken, getEmail, clearAuth } from "@/lib/authStorage";

function useIsClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

const Item = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const ready = useIsClient();
  const pathname = usePathname();
  const active = ready && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      suppressHydrationWarning
      className={`px-3 py-2 rounded-md text-[15px] font-medium transition ${
        active ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

// ----------------------------------------
// AUTH DESKTOP
// ----------------------------------------
function AuthActionsDesktop({
  authed,
  email,
  onLogout,
}: {
  authed: boolean | null;
  email: string | null;
  onLogout: () => void;
}) {
  const ready = useIsClient();
  const pathname = usePathname();

  // --- Segmentar ---
  const segmentButton = useMemo(() => {
    if (!ready) return { href: "/segment", label: "Segmentar" };
    const inHistory = pathname.startsWith("/segment/history");
    const inSegment = pathname.startsWith("/segment") && !inHistory;
    if (inHistory) return { href: "/segment", label: "Segmentar" };
    if (inSegment) return { href: "/segment/history", label: "Historial" };
    return { href: "/segment", label: "Segmentar" };
  }, [ready, pathname]);

  // --- Etiquetar ---
const labelButton = useMemo(() => {
  const inLabel = pathname.startsWith("/label");
  const inSegmentHistory = pathname.startsWith("/segment/history");

  if (inSegmentHistory) {
    return { href: "/label", label: "Etiquetar" };
  }

  if (inLabel) {
    return { href: "/segment/history", label: "Historial" };
  }

  return { href: "/label", label: "Etiquetar" };
}, [pathname]);

  if (authed === null) {
    return (
      <div className="ml-2 flex items-center gap-2" suppressHydrationWarning>
        <Link
          href={segmentButton.href}
          className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
        >
          {segmentButton.label}
        </Link>

        <Link
          href={labelButton.href}
          className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
        >
          {labelButton.label}
        </Link>

        <span className="px-3 py-2 rounded-md text-[15px] font-semibold border border-transparent text-transparent select-none">
          Loading
        </span>
      </div>
    );
  }

  return authed ? (
    <>
      <Link
        href={segmentButton.href}
        className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        {segmentButton.label}
      </Link>

      <Link
        href={labelButton.href}
        className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        {labelButton.label}
      </Link>

      <button
        onClick={onLogout}
        className="ml-2 relative h-9 px-3 rounded-md border border-white/15 bg-white/10 text-white overflow-hidden group"
      >
        <span className="block transition-transform duration-200 ease-out group-hover:-translate-y-6">
          {email ?? "Usuario"}
        </span>
        <span className="absolute left-0 top-0 h-9 w-full grid place-items-center translate-y-6 transition-transform duration-200 ease-out group-hover:translate-y-0">
          Cerrar sesión
        </span>
      </button>
    </>
  ) : (
    <>
      <Link
        href={segmentButton.href}
        className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        {segmentButton.label}
      </Link>

      <Link
        href={labelButton.href}
        className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        {labelButton.label}
      </Link>

      <div className="ml-2 flex items-center gap-2">
        <Link
          href="/login"
          className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/signup"
          className="px-3 py-2 rounded-md text-[15px] font-semibold bg-gradient-to-tr from-emerald-400 to-blue-500 text-black"
        >
          Crear cuenta
        </Link>
      </div>
    </>
  );
}

// ----------------------------------------
// AUTH MOBILE
// ----------------------------------------
function AuthActionsMobile({
  authed,
  email,
  onLogout,
}: {
  authed: boolean | null;
  email: string | null;
  onLogout: () => void;
}) {
  const ready = useIsClient();
  const pathname = usePathname();

  const segmentButton = useMemo(() => {
    if (!ready) return { href: "/segment", label: "Segmentar" };
    const inHistory = pathname.startsWith("/segment/history");
    const inSegment = pathname.startsWith("/segment") && !inHistory;
    if (inHistory) return { href: "/segment", label: "Segmentar" };
    if (inSegment) return { href: "/segment/history", label: "Historial" };
    return { href: "/segment", label: "Segmentar" };
  }, [ready, pathname]);

const labelButton = useMemo(() => {
  const inLabel = pathname.startsWith("/label");
  const inSegmentHistory = pathname.startsWith("/segment/history");

  if (inSegmentHistory) {
    return { href: "/label", label: "Etiquetar" };
  }

  if (inLabel) {
    return { href: "/segment/history", label: "Historial" };
  }

  return { href: "/label", label: "Etiquetar" };
}, [pathname]);


  if (authed === null) {
    return (
      <div className="mt-2 flex items-center gap-2" suppressHydrationWarning>
        <Link
          href={segmentButton.href}
          className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
        >
          {segmentButton.label}
        </Link>

        <Link
          href={labelButton.href}
          className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
        >
          {labelButton.label}
        </Link>

        <span className="px-3 py-2 rounded-md text-[15px] font-semibold border border-transparent text-transparent select-none">
          Loading
        </span>
      </div>
    );
  }

  return authed ? (
    <>
      <Link
        href={segmentButton.href}
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
      >
        {segmentButton.label}
      </Link>

      <Link
        href={labelButton.href}
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
      >
        {labelButton.label}
      </Link>

      <button
        onClick={onLogout}
        className="mt-2 relative h-10 px-3 rounded-md border border-white/15 bg-white/10 text-white overflow-hidden group w-fit"
      >
        <span className="block transition-transform duration-200 ease-out group-hover:-translate-y-7">
          {email ?? "Usuario"}
        </span>
        <span className="absolute left-0 top-0 h-10 w-full grid place-items-center translate-y-7 transition-transform duration-200 ease-out group-hover:translate-y-0">
          Cerrar sesión
        </span>
      </button>
    </>
  ) : (
    <div className="mt-2 flex items-center gap-2">
      <Link
        href={segmentButton.href}
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
      >
        {segmentButton.label}
      </Link>

      <Link
        href={labelButton.href}
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
      >
        {labelButton.label}
      </Link>

      <Link
        href="/login"
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        Iniciar sesión
      </Link>
      <Link
        href="/signup"
        className="px-3 py-2 rounded-md text-[15px] font-semibold bg-gradient-to-tr from-emerald-400 to-blue-500 text-black"
      >
        Crear cuenta
      </Link>
    </div>
  );
}

// ----------------------------------------
// NAV COMPLETO
// ----------------------------------------
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setAuthed(!!getToken());
      setEmail(getEmail());
    };
    update();
    window.addEventListener("auth:change", update);
    return () => window.removeEventListener("auth:change", update);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!dropRef.current) return;
      if (!dropRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHovering(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setAuthed(false);
    setEmail(null);
    router.push("/");
  };

  // --- Etiquetar para mobile (necesario aquí también) ---
  // --- Etiquetar para móvil ---
  const labelButton = useMemo(() => {
    const inHistory = pathname.startsWith("/label/history");
    const inLabel = pathname.startsWith("/label") && !inHistory;

    if (inHistory) return { href: "/label", label: "Etiquetar" };
    if (inLabel) return { href: "/label/history", label: "Historial" };
    return { href: "/label", label: "Etiquetar" };
  }, [pathname]);


  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-transparent supports-[backdrop-filter]:bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">

<Link href="/" className="inline-flex items-center gap-2">
  <img
    src="/logo.png"
    alt="Acker Logo"
    className="h-8 w-auto"   // NO se deforma
  />
  <span className="font-bold text-white text-xl tracking-tight">
    ACKER
  </span>
</Link>





        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-1">
          <Item href="/about">Sobre ACKER</Item>

          {/* Dropdown cultivos */}
          <div ref={dropRef} className="relative">
            <button
              className="px-3 py-2 rounded-md text-[15px] font-medium text-slate-300 hover:text-white flex items-center gap-1"
              onClick={() => setOpen((v) => !v)}
              onMouseEnter={() => setHovering(true)}
            >
              Cultivos ▾
            </button>

            {(open || hovering) && (
              <div
                className="absolute left-0 top-full z-50 bg-card border border-border rounded-lg shadow-xl p-2 mt-2"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => {
                  setHovering(false);
                  setOpen(false);
                }}
              >
                <Link href="/crops/lettuce" className="block px-3 py-2 rounded hover:bg-secondary/20">
                  Lechuga
                </Link>
                <Link href="/crops/maize" className="block px-3 py-2 rounded hover:bg-secondary/20">
                  Maíz
                </Link>
                <Link href="/crops/brassicas" className="block px-3 py-2 rounded hover:bg-secondary/20">
                  Col y brásicas
                </Link>
                <div className="my-2 h-px bg-border" />
                <Link href="/crops" className="block px-3 py-2 rounded hover:bg-secondary/20">
                  Ver todos
                </Link>
              </div>
            )}
          </div>

          <Item href="/platform">Plataforma</Item>
          <Item href="/faqs">FAQs</Item>
          <Item href="/contact">Contacto</Item>

          {/* Botones auth */}
          <AuthActionsDesktop authed={authed} email={email} onLogout={handleLogout} />
        </nav>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-slate-300" onClick={() => setMobile((v) => !v)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobile && (
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
            <Item href="/about">Sobre ACKER</Item>
            <Item href="/crops">Cultivos</Item>
            <Item href="/platform">Plataforma</Item>
            <Item href="/news">Noticias</Item>
            <Item href="/faqs">FAQs</Item>
            <Item href="/contact">Contacto</Item>

            <Link
              href={labelButton.href}
              className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
            >
              {labelButton.label}
            </Link>

            <AuthActionsMobile authed={authed} email={email} onLogout={handleLogout} />
          </nav>
        </div>
      )}
    </header>
  );
}
