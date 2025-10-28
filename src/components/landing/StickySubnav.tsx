"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Item { id: string; label: string }

const DEFAULT_ITEMS: Item[] = [
  { id: "overview", label: "Overview" },
  { id: "use-cases", label: "Casos de uso" },
  { id: "modules", label: "Módulos" },
  { id: "specs", label: "Especificaciones" },
];

export default function StickySubnav({
  items = DEFAULT_ITEMS,
  offsetTop = 64,         
  showBrand = false,
  showAuth = false,
  className = "",
  hideOnMobile = true,
}: {
  items?: Item[];
  offsetTop?: number;
  showBrand?: boolean;
  showAuth?: boolean;
  className?: string;
  hideOnMobile?: boolean;
}) {
  const safeItems = Array.isArray(items) && items.length ? items : DEFAULT_ITEMS;
  const [active, setActive] = useState<string>(safeItems?.[0]?.id ?? "overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    safeItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [safeItems]);

  return (
    <div
      className={[
        "sticky z-40 border-b border-white/10",
        "bg-transparent supports-[backdrop-filter]:bg-black/30 backdrop-blur-md",
        hideOnMobile ? "hidden md:block" : "",
        className,
      ].join(" ")}
      style={{ top: offsetTop }}
      role="navigation"
      aria-label="Subsecciones"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-2">
        {showBrand && (
          <Link href="/" className="mr-2 flex items-center gap-2">
            <div className="h-8 w-8 grid place-items-center rounded-lg bg-gradient-to-tr from-emerald-400 to-blue-500 text-black font-bold">A</div>
            <span className="text-sm sm:text-base font-semibold">CKER</span>
          </Link>
        )}

        <nav className="flex items-center gap-1 overflow-x-auto">
          {safeItems.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={[
                "px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition border",
                active === it.id
                  ? "bg-white text-black border-white"
                  : "text-white/80 hover:text-white border-white/15"
              ].join(" ")}
            >
              {it.label}
            </a>
          ))}

          {showAuth && (
            <div className="ml-2 hidden sm:flex items-center gap-2">
              <Link href="/login" className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-white/20 hover:bg-white/10">Login</Link>
              <Link href="/signup" className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-tr from-emerald-400 to-blue-500 text-black">Crear cuenta</Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
