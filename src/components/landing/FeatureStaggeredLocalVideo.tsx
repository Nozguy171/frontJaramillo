"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import VideoLightboxLocal from "@/components/landing/VideoLightboxLocal";

interface CTA { href: string; label: string }

export default function FeatureStaggeredLocalVideo({
  id,
  imageSrc,
  imageAlt = "",
  title,
  body,
  videoSrc,
  poster,
  ctas = [],
  cardOffsetY = -32, 
  mediaShadow = true,
}: {
  id?: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  body: React.ReactNode;
  videoSrc: string;  
  poster?: string;
  ctas?: CTA[];
  cardOffsetY?: number;
  mediaShadow?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 pt-10 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          className={`relative lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 ${mediaShadow ? "shadow-2xl" : ""}`}
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
          <button
            type="button"
            aria-label="Reproducir video"
            onClick={() => setOpen(true)}
            className="group absolute inset-0 grid place-items-center"
          >
            <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 shadow-xl group-hover:scale-105 transition">
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-black"><path d="M8 5v14l11-7z"/></svg>
            </span>
          </button>
        </motion.div>

        <motion.aside
          className="relative lg:col-span-5"
          initial={{ y: -8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="bg-white text-slate-800 rounded-2xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,.35)] p-6 md:p-7 lg:p-8"
            style={{ transform: `translateY(${cardOffsetY}px)` }}
          >
            <h3 className="text-2xl md:text-[28px] font-semibold leading-[1.15]">{title}</h3>
            <p className="mt-3 text-[15px] md:text-base text-slate-600 leading-relaxed">{body}</p>
            {!!ctas.length && (
              <div className="mt-5 flex gap-3">
                {ctas.map((c) => (
                  <Link key={c.label} href={c.href} className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.aside>
      </div>

      {/* Lightbox local con animación de aparición */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VideoLightboxLocal open={open} onClose={() => setOpen(false)} src={videoSrc} poster={poster} title={title} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
