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
  const p = usePathname();
  const active = ready && (p === href || p.startsWith(href + "/"));
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

  const { href, label } = useMemo(() => {
    if (!ready) return { href: "/segment", label: "Segmentar" };
    const inHistory = pathname.startsWith("/segment/history");
    const inSegment = pathname.startsWith("/segment") && !inHistory;
    if (inHistory) return { href: "/segment", label: "Segmentar" };
    if (inSegment) return { href: "/segment/history", label: "Historial" };
    return { href: "/segment", label: "Segmentar" };
  }, [ready, pathname]);

  if (authed === null) {
    return (
      <div className="ml-2 flex items-center gap-2" suppressHydrationWarning>
        <Link
          href={href}
          className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
        >
          {label}
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
        href={href}
        className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        {label}
      </Link>
      <button
        onClick={onLogout}
        className="ml-2 relative h-9 px-3 rounded-md border border-white/15 bg-white/10 text-white overflow-hidden group"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
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
        href={href}
        className="ml-2 px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10"
      >
        {label}
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

  const { href, label } = useMemo(() => {
    if (!ready) return { href: "/segment", label: "Segmentar" };
    const inHistory = pathname.startsWith("/segment/history");
    const inSegment = pathname.startsWith("/segment") && !inHistory;
    if (inHistory) return { href: "/segment", label: "Segmentar" };
    if (inSegment) return { href: "/segment/history", label: "Historial" };
    return { href: "/segment", label: "Segmentar" };
  }, [ready, pathname]);

  if (authed === null) {
    return (
      <div className="mt-2 flex items-center gap-2" suppressHydrationWarning>
        <Link
          href={href}
          className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
        >
          {label}
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
        href={href}
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
      >
        {label}
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
        href={href}
        className="px-3 py-2 rounded-md text-[15px] font-semibold border border-white/20 hover:bg-white/10 w-fit"
      >
        {label}
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

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setAuthed(!!getToken());
      setEmail(getEmail());
    };
    update();
    const onChange = () => update();
    window.addEventListener("auth:change", onChange);
    return () => window.removeEventListener("auth:change", onChange);
  }, []);

    useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!dropRef.current) return;
      if (!dropRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHovering(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setHovering(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const show = open || hovering;

  const handleLogout = () => {
    clearAuth();
    setAuthed(false);
    setEmail(null);
    router.push("/");
  };

  return (
    <header
      className="
        sticky top-0 z-50 border-b border-white/10
        bg-transparent
        supports-[backdrop-filter]:bg-black/40
        backdrop-blur
      "
    >
      <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">

<Link href="/" className="inline-flex items-center gap-0.5">
  <div className="h-5 w-5 grid place-items-center rounded-md bg-emerald-500 font-black text-black text-xl shrink-0">
    <span className="-translate-y-[4px] inline-block">A</span>
  </div>
  <span className="font-bold leading-none tracking-tight text-white">CKER</span>
</Link>


        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <Item href="/about">Sobre ACKER</Item>

          {/* Dropdown: Cultivos */}
{/* Dropdown: Cultivos */}
<div
  ref={dropRef}
  className="relative"
  onMouseEnter={() => setHovering(true)}
  onMouseLeave={() => {
    setHovering(false);
    setOpen(false);          
  }}
>
  <button
    className="px-3 py-2 rounded-md text-[15px] font-medium text-slate-300 hover:text-white flex items-center gap-1"
    onClick={() => setOpen((v) => !v)}
    aria-expanded={open || hovering}
    aria-haspopup="menu"
  >
    Cultivos <span className={`transition ${open || hovering ? "rotate-180" : ""}`}>▾</span>
  </button>

  {(open || hovering) && (
    <div
      className="absolute left-0 top-full z-50"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setOpen(false);
      }}
    >
      <div className="h-2 w-full" />
      <div role="menu" className="w-56 rounded-lg border border-white/10 bg-slate-900 shadow-xl p-2">
        <Link
          className="block px-3 py-2 rounded text-slate-200 hover:bg-white/10"
          href="/crops/lettuce"
          onClick={() => setOpen(false)} 
        >
          Lechuga
        </Link>
        <Link
          className="block px-3 py-2 rounded text-slate-200 hover:bg-white/10"
          href="/crops/maize"
          onClick={() => setOpen(false)}
        >
          Maíz
        </Link>
        <Link
          className="block px-3 py-2 rounded text-slate-200 hover:bg-white/10"
          href="/crops/brassicas"
          onClick={() => setOpen(false)}
        >
          Col y brásicas
        </Link>
        <div className="my-2 h-px bg-white/10" />
        <Link
          className="block px-3 py-2 rounded text-slate-200 hover:bg-white/10"
          href="/crops"
          onClick={() => setOpen(false)}
        >
          Ver todos
        </Link>
      </div>
    </div>
  )}
</div>


          <Item href="/platform">Plataforma</Item>
          <Item href="/news">Noticias</Item>
          <Item href="/faqs">FAQs</Item>
          <Item href="/contact">Contacto</Item>

          {/* Acciones Auth + Segmentar/Historial */}
          <AuthActionsDesktop authed={authed} email={email} onLogout={handleLogout} />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobile((v) => !v)}
          aria-label="Menú"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div
          className="
            md:hidden border-t border-white/10
            bg-transparent
            supports-[backdrop-filter]:bg-black/60
            backdrop-blur
          "
        >
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
            <Item href="/about">Sobre ACKER</Item>
            <details>
              <summary className="cursor-pointer px-3 py-2 rounded-md text-[15px] text-slate-300 hover:text-white">
                Cultivos
              </summary>
              <div className="pl-3 py-2 flex flex-col gap-1">
                <Link href="/crops/lettuce" className="px-3 py-2 rounded text-slate-200 hover:bg-white/10">Lechuga</Link>
                <Link href="/crops/maize" className="px-3 py-2 rounded text-slate-200 hover:bg-white/10">Maíz</Link>
                <Link href="/crops/brassicas" className="px-3 py-2 rounded text-slate-200 hover:bg-white/10">Col y brásicas</Link>
                <Link href="/crops" className="px-3 py-2 rounded text-slate-200 hover:bg-white/10">Ver todos</Link>
              </div>
            </details>
            <Item href="/platform">Plataforma</Item>
            <Item href="/news">Noticias</Item>
            <Item href="/faqs">FAQs</Item>
            <Item href="/contact">Contacto</Item>

            <AuthActionsMobile authed={authed} email={email} onLogout={handleLogout} />
          </nav>
        </div>
      )}
    </header>
  );
}
