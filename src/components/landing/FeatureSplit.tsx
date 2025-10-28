"use client";
import Image from "next/image";
import Link from "next/link";

interface Media { type: "image" | "video"; src: string; alt?: string }

export default function FeatureSplit({
  id,
  media,
  title,
  body,
  align = "right",
  ctas,
}: {
  id?: string;
  media: Media;
  title: string;
  body: React.ReactNode;
  align?: "right" | "left";
  ctas?: { href: string; label: string }[];
}) {
  const alignClass = align === "right" ? "md:ml-auto md:mr-6" : "md:mr-auto md:ml-6";

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 pt-10 pb-16">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {media.type === "image" ? (
          <Image src={media.src} alt={media.alt ?? "Imagen"} width={1600} height={900} className="w-full h-auto object-cover" />
        ) : (
          <video src={media.src} controls className="w-full max-h-[70vh] object-contain" />
        )}
      </div>

      {/* Card superpuesta */}
      <div
        className={`relative z-10 -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-24 w-full max-w-md md:max-w-lg bg-white text-slate-800 rounded-2xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,.35)] p-6 md:p-7 lg:p-8 isolate ${alignClass}`}
      >
        <h3 className="text-2xl md:text-[28px] font-semibold leading-[1.15]">{title}</h3>
        <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{body}</p>
        {ctas && (
          <div className="mt-5 flex gap-3">
            {ctas.map((c) => (
              <Link key={c.label} href={c.href} className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition">
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
