"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoLightboxLocal from "@/components/landing/VideoLightboxLocal";

export default function FeatureSplitLocalVideo({
  id,
  imageSrc,
  imageAlt = "",
  title,
  body,
  align = "right",
  videoSrc,
  poster,
  ctas,
}: {
  id?: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  body: React.ReactNode;
  align?: "right" | "left";
  videoSrc: string; 
  poster?: string;  
  ctas?: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const alignClass = align === "right" ? "md:ml-auto md:mr-6" : "md:mr-auto md:ml-6";

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 pt-10 pb-16">
      {/* Imagen con botón play */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <Image src={imageSrc} alt={imageAlt} width={1600} height={900} className="w-full h-auto object-cover" />
        <button type="button" aria-label="Reproducir video" onClick={() => setOpen(true)} className="group absolute inset-0 grid place-items-center">
          <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 shadow-xl group-hover:scale-105 transition">
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-black"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      </div>

      {/* Card superpuesta */}
      <div className={`relative z-10 -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-24 w-full max-w-md md:max-w-lg bg-white text-slate-800 rounded-2xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,.35)] p-6 md:p-7 lg:p-8 isolate ${alignClass}`}>
        <h3 className="text-2xl md:text-[28px] font-semibold leading-[1.15]">{title}</h3>
        <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{body}</p>
        {ctas?.length ? (
          <div className="mt-5 flex gap-3">
            {ctas.map((c) => (
              <Link key={c.label} href={c.href} className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition">
                {c.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {/* Lightbox local */}
      <VideoLightboxLocal open={open} onClose={() => setOpen(false)} src={videoSrc} title={title} poster={poster} />
    </section>
  );
}
