"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Hotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  body: string;
};

// 🔹 Defaults (tus actuales)
const DEFAULT_HOTSPOTS: Hotspot[] = [
  { id: "bars-top", x: 58, y: 24, title: "Barras superiores", body: "Conectores rígidos para mantener el escuadre." },
  { id: "transmission", x: 72, y: 36, title: "Conjunto de transmisión", body: "Acople y reducción para par elevado." },
  { id: "right-rod", x: 77, y: 59, title: "Barra lateral", body: "Elemento tubular de alta rigidez." },
  { id: "left-box", x: 34, y: 47, title: "Módulo electrónico", body: "Controladores y telemetría IP65." },
  { id: "right-leg", x: 67, y: 78, title: "Módulo de pierna", body: "Refuerzo generativo para cargas laterales." },
  { id: "left-wheel", x: 23, y: 82, title: "Rueda delantera", body: "Neumático agrícola de baja compactación." },
];

type HeroRoverProps = {
  title?: React.ReactNode;
  subtitleBadges?: string[];
  imageSrc?: string;
  imageAlt?: string;
  hotspots?: Hotspot[];
};

export default function HeroRover({
  title = (
    <>
      PRESENTAMOS{" "}
      <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">ACKER</span>
    </>
  ),
  subtitleBadges = ["Polytunnels", "Open field", "Vineyards"],
  imageSrc = "/rover-chassis.png",
  imageAlt = "Chasis del rover",
  hotspots = DEFAULT_HOTSPOTS,
}: HeroRoverProps) {
  return (
    <section className="relative overflow-hidden">
      {/* glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10rem] left-[-5rem] h-[25rem] w-[25rem] rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute bottom-[-10rem] right-[-5rem] h-[25rem] w-[25rem] rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 pt-16 pb-14">
        {/* texto */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">Plataforma robótica autónoma</p>
          <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            {title}
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
            Módulos intercambiables, navegación autónoma y visión por computadora para tareas reales en cultivo.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {subtitleBadges.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/segment" className="px-8 py-3 rounded-xl text-sm font-semibold bg-gradient-to-tr from-emerald-400 to-blue-500 text-black shadow-lg hover:brightness-110">
              🚀 Probar el modelo
            </Link>
            <Link href="/segment" className="px-8 py-3 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/10">
              Ver demo
            </Link>
          </div>
        </div>

        {/* imagen + hotspots */}
        <div className="relative">
          <HotspotImage src={imageSrc} alt={imageAlt} aspect="4/3" hotspots={hotspots} />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/10 shadow-sm pointer-events-none">
            YOLO v8 • Powered by AI
          </div>
        </div>
      </div>
    </section>
  );
}

export function HotspotImage({
  src,
  alt,
  aspect = "4/3",
  hotspots,
}: {
  src: string;
  alt: string;
  aspect?: `${number}/${number}` | string;
  hotspots: Hotspot[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpenId(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const R = 36;

  return (
    <div
      ref={boxRef}
      className="relative shadow-2xl bg-transparent"
      style={{ aspectRatio: aspect, borderRadius: R, overflow: "hidden", clipPath: `inset(0 round ${R}px)` }}
      onDragStart={(e) => e.preventDefault()}
      onClick={() => setOpenId(null)}
    >
      <Image src={src} alt={alt} fill priority draggable={false} className="object-contain w-full h-full pointer-events-none select-none" sizes="(min-width:1024px) 50vw, 100vw" />
      {hotspots.map((h) => {
        const openLeft  = h.x > 66;
        const openRight = h.x < 34;
        const openUp    = h.y > 66;
        const openDown  = h.y < 34;

        const cardPos =
          openLeft  ? "right-[calc(100%+10px)]"
        : openRight ? "left-[calc(100%+10px)]"
                    : "left-1/2 -translate-x-1/2";

        const cardPosY =
          openUp    ? "bottom-[calc(100%+10px)]"
        : openDown  ? "top-[calc(100%+10px)]"
                    : "top-1/2 -translate-y-1/2";

        const arrowSide =
          openLeft  ? "after:right-[-6px] after:border-l-white"
        : openRight ? "after:left-[-6px]  after:border-r-white"
        : openUp    ? "after:bottom-[-6px] after:border-t-white"
                    : "after:top-[-6px]    after:border-b-white";

        return (
          <div key={h.id} className="absolute z-50 pointer-events-none" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}>
            <button
              aria-expanded={openId === h.id}
              aria-controls={`hotspot-${h.id}`}
              onClick={(e) => { e.stopPropagation(); setOpenId((v) => (v === h.id ? null : h.id)); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenId((v) => (v === h.id ? null : h.id)); } }}
              className="relative grid place-items-center w-10 h-10 rounded-full bg-[#C62828] text-white ring-4 ring-white shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:scale-[1.06] active:scale-100 transition pointer-events-auto z-50"
              style={{ touchAction: "manipulation" }}
              title={h.title}
            >
              <span className="text-xl leading-none">+</span>
              <span className="absolute -z-10 inset-0 rounded-full bg-[#C62828]/20 blur-md" />
            </button>

            <div
              id={`hotspot-${h.id}`}
              className={`absolute z-50 min-w-[200px] max-w-[260px] ${cardPos} ${cardPosY}`}
              role="dialog"
              aria-label={h.title}
              aria-hidden={openId !== h.id}
              style={{ pointerEvents: openId === h.id ? "auto" : "none" }}
            >
              <div className={`relative origin-top-left rounded-xl border border-white/10 bg-white text-slate-900 shadow-2xl p-3
                after:content-[""] after:absolute after:w-0 after:h-0 after:border-8 after:border-transparent ${arrowSide}
                transition ${openId === h.id ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <p className="text-sm font-semibold">{h.title}</p>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{h.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
