"use client";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  src: string;     
  title?: string;
  poster?: string;  
}

export default function VideoLightboxLocal({ open, onClose, src, title, poster }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {

    if (open && ref.current) {
      const p = ref.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal>
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5">
          <div className="text-sm font-medium text-white/80 truncate pr-2">{title || "Video"}</div>
          <button onClick={onClose} className="rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 text-white" aria-label="Cerrar">✕</button>
        </div>
        <video ref={ref} src={src} poster={poster} controls className="w-full h-auto max-h-[80vh] object-contain bg-black" />
      </div>

      <button className="fixed inset-0 -z-10" aria-label="Cerrar" onClick={onClose} />
    </div>
  );
}
