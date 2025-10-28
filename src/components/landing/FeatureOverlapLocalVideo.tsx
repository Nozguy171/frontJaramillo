"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { usePathname } from "next/navigation";
import VideoLightboxLocal from "@/components/landing/VideoLightboxLocal";

interface CTA { href: string; label: string }

type Props = {
  id?: string;
  title: string;
  body: React.ReactNode;
  videoSrc: string;
  previewSrc?: string;
  poster?: string;
  ctas?: CTA[];
  showFullscreenButton?: boolean;
  radius?: number;
  aspect?: string;

  align?: "video-left" | "video-right";

  offsetX?: number;
  offsetY?: number;
  hardOverlap?: number;
  expandedBiasX?: number;

  groupShiftX?: number;
};

export default function FeatureOverlapLocalVideo({
  id,
  title,
  body,
  videoSrc,
  previewSrc,
  poster,
  ctas = [],
  showFullscreenButton = true,
  radius = 28,
  aspect = "16 / 9",

  align = "video-left",

  offsetX = 56,
  offsetY = 0,
  hardOverlap = 64,
  expandedBiasX = -32,

  groupShiftX = 0, 
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const TRANS_SPRING: Transition = { type: "spring", stiffness: 420, damping: 36, mass: 0.8 };

  const dir = align === "video-right" ? -1 : 1;
  const half = hardOverlap / 2;
  const bias = expanded ? expandedBiasX * dir : 0;

  const xVideo = dir * (expanded ? -offsetX :  half) + bias;
  const xCard  = dir * (expanded ?  offsetX : -half) + bias;
  const yCard  = expanded ? 0 : offsetY;

  const pauseVideo = () => { try { videoRef.current?.pause(); } catch {} };

  useEffect(() => {
    if (expanded && videoRef.current) {
      const p = videoRef.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }
  }, [expanded]);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { setExpanded(false); pauseVideo(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onDown = (ev: MouseEvent) => {
      const root = sectionRef.current;
      if (root && !root.contains(ev.target as Node)) { setExpanded(false); pauseVideo(); }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => { setExpanded(false); pauseVideo(); }, [pathname]);
  useEffect(() => {
    const h = () => { setExpanded(false); pauseVideo(); };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  const panelStyle = useMemo(
    () => ({ aspectRatio: aspect, borderRadius: radius }),
    [aspect, radius]
  );

  const previewForLightbox = previewSrc || poster;
  const reverse = align === "video-right";

  return (
    <section id={id} ref={sectionRef} className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <div className="mx-auto w-full lg:w-[80%]">
        <div
          className={[
            "relative flex flex-col items-center justify-center",
            reverse ? "lg:flex-row-reverse" : "lg:flex-row",
          ].join(" ")}
          style={{ transform: `translateX(${groupShiftX}px)` }} 
        >
          {/* VIDEO */}
          <motion.div
            animate={{ x: xVideo, y: 0 }}
            transition={TRANS_SPRING}
            className="relative w-[85%] lg:w-1/2"
            style={{ zIndex: !expanded ? 5 : 1, willChange: "transform" }}
          >
            <div
              className="relative overflow-hidden border border-white/10 bg-white/5 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px]"
              style={panelStyle}
            >
              {/* Preview (solo colapsado) */}
              {previewSrc && (
                <img
                  src={previewSrc}
                  alt="preview"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                    expanded ? "opacity-0" : "opacity-100"
                  }`}
                  draggable={false}
                />
              )}
              {/* Video (expandido) */}
              <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                preload="metadata"
                playsInline
                controls={expanded}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                  expanded ? "opacity-100" : "opacity-0"
                }`}
              />
              {!expanded && (
                <button
                  type="button"
                  aria-label="Reproducir video"
                  onClick={() => setExpanded(true)}
                  className="group absolute inset-0 grid place-items-center"
                >
                  <span className="grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 shadow-xl group-hover:scale-105 transition">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 fill-black">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* CARD */}
          <motion.div
            animate={{ x: xCard, y: yCard }}
            transition={TRANS_SPRING}
            className="relative w-[85%] lg:w-1/2"
            style={{ zIndex: !expanded ? 10 : 1, willChange: "transform" }}
          >
            <div
              className="relative shadow-[0_15px_40px_rgba(0,0,0,.35)] border border-black/5 bg-white text-slate-800 overflow-hidden min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px]"
              style={panelStyle}
            >
              <div className="absolute inset-0 p-5 md:p-6 lg:p-6 overflow-auto">
                <h3 className="text-xl md:text-2xl font-semibold leading-[1.15]">{title}</h3>
                <p className="mt-2 text-[14px] md:text-[15px] text-slate-600 leading-relaxed">{body}</p>
                {!!ctas.length && (
                  <div className="mt-4 flex gap-2">
                    {ctas.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="px-3 py-2 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
                {showFullscreenButton && (
                  <div className="mt-3">
                    <button
                      onClick={() => setLightbox(true)}
                      className="text-sm px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50"
                    >
                      Ver en grande
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showFullscreenButton && (
        <VideoLightboxLocal
          open={lightbox}
          onClose={() => setLightbox(false)}
          src={videoSrc}
          poster={previewForLightbox}
          title={title}
        />
      )}
    </section>
  );
}
