"use client";

import { useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import ObjectExtras from "@/components/ObjectExtras";
import {
  segmentAuto,
  segmentAutoVideo,
  pollVideoUntilReady,
  isVideoFile,
  type SegmentObject,
  toAbs,
} from "@/lib/visionApi";

export default function SegmentPage() {
  return (
    <RequireAuth>
      <SegmentContent />
    </RequireAuth>
  );
}

function SegmentContent() {
  const [file, setFile] = useState<File | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [overlayImg, setOverlayImg] = useState<string | null>(null);
  const [overlayVideoUrl, setOverlayVideoUrl] = useState<string | null>(null);

  const [objects, setObjects] = useState<SegmentObject[]>([]);
  const [objectsTotals, setObjectsTotals] = useState<Record<string, number> | null>(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onPick = (f: File | null) => {
    setFile(f);
    setErrorMsg(null);
    setStatusMsg(null);
    setObjects([]);
    setObjectsTotals(null);
    setOverlayImg(null);
    setOverlayVideoUrl(null);
    const v = isVideoFile(f);
    setIsVideo(!!v);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onSubmit = async () => {
    if (!file) { setErrorMsg("Sube un archivo primero."); return; }
    try {
      setLoading(true);
      setErrorMsg(null);
      setStatusMsg(null);

      if (isVideo) {
        const resp = await segmentAutoVideo(file, { save: true });
        const vid = resp.video.id;
        setStatusMsg(`Procesando video #${vid}…`);
        const done = await pollVideoUntilReady(vid, { intervalMs: 2000, timeoutMs: 60 * 60 * 1000 });
        setOverlayVideoUrl(toAbs(done.overlay_url) || null);
        setObjects([]);
        setObjectsTotals(done.objects_totals || null);
        setStatusMsg(`Listo (#${vid})`);
      } else {
        const res = await segmentAuto(file, { save: true });
        const after = res.overlay_jpg_b64 || res.image?.overlay_url;
        setOverlayImg(after ? (toAbs(after) || after) : null);
        setObjects(res.objects || []);
        setStatusMsg("Listo");
      }
    } catch (e: any) {
      setErrorMsg(e?.response?.data?.error || e?.message || "No se pudo procesar el archivo.");
      setStatusMsg(null);
    } finally {
      setLoading(false);
    }
  };

  const beforeSrc = preview ?? undefined;

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-tr from-emerald-400 to-blue-500 text-black font-bold text-lg shadow-md">
              R
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              ROVER<span className="text-emerald-400">.AI</span>
            </span>
          </Link>
          <Link
            href="/segment/history"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-gradient-to-tr from-emerald-400 to-blue-500 shadow-lg hover:brightness-110 active:scale-[.98] transition"
          >
            Ver historial →
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Segmentación <span className="text-emerald-400">(YOLO)</span>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-white/10 border border-white/10">
              {isVideo ? "Video" : "Imagen"}
            </span>
          </h1>
        </header>

        {/* Toolbar */}
        <div className="card p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <label className="text-sm w-full sm:w-auto">
            <span className="block text-slate-300 mb-1">Archivo (imagen o video)</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => onPick(e.target.files?.[0] || null)}
              className="block w-full text-sm
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gradient-to-tr file:from-emerald-400 file:to-blue-500 file:text-black
                         hover:file:brightness-110
                         active:file:scale-[.98] transition"
            />
          </label>

          <button
            onClick={onSubmit}
            disabled={!file || loading}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold text-black shadow-lg transition 
              ${loading ? "bg-emerald-300 cursor-not-allowed" : "bg-gradient-to-tr from-emerald-400 to-blue-500 hover:brightness-110 active:scale-[.98]"}`}
          >
            {loading ? "Procesando…" : "Auto-segmentar y guardar"}
          </button>
        </div>

        {statusMsg && <div className="text-xs text-slate-300">{statusMsg}</div>}
        {errorMsg ? <div className="text-red-400 text-sm">{errorMsg}</div> : null}

        {/* Lado a lado: Antes / Después */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="card p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Antes</div>
              <span className="badge">{
                isVideo ? "Original (video)" : "Original"
              }</span>
            </div>
            {!beforeSrc ? (
              <EmptyBox hint="Sube un archivo para ver el 'Antes'." />
            ) : isVideo ? (
              <video src={beforeSrc} controls className="w-full rounded-lg border border-white/10" />
            ) : (
              <img src={beforeSrc} alt="Antes" className="w-full rounded-lg border border-white/10" />
            )}
          </figure>

          <figure className="card p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Después</div>
              <span className="badge bg-emerald-400/20 text-emerald-300 border-emerald-400/30">Overlay</span>
            </div>

            {!isVideo && overlayImg && (
              <img src={overlayImg} alt="Después" className="w-full rounded-lg border border-white/10" />
            )}

            {isVideo && overlayVideoUrl && (
              <video src={overlayVideoUrl} controls className="w-full rounded-lg border border-white/10" />
            )}

            {((!isVideo && !overlayImg) || (isVideo && !overlayVideoUrl)) && (
              <EmptyBox hint={isVideo ? "Esperando el overlay del video…" : "Procesa el archivo para ver el 'Después'."} />
            )}
          </figure>
        </section>

        {/* Objetos detectados */}
        <section className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Objetos detectados</h2>
            <span className="text-xs text-slate-400">{objects.length} elementos</span>
          </div>

          {objects.length ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {objects.map((o) => (
                <li key={o.id} className="rounded-lg border border-white/10 p-3 bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{o.class}</div>
                    <span className="badge bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                      conf {(o.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="progress mb-2">
                    <span style={{ width: `${Math.max(0, Math.min(100, o.score * 100))}%` }} />
                  </div>
                  <div className="text-xs text-slate-300/80">
                    bbox: [{o.bbox.map((v) => v.toFixed(1)).join(", ")}]
                  </div>
                  <ObjectExtras o={o} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyBox hint={isVideo ? "No hay detecciones cuadro a cuadro (mostramos el resumen abajo)." : "No hay detecciones todavía."} />
          )}
        </section>

        {/* Resumen video */}
        {isVideo && objectsTotals && (
          <section className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Resumen (video)</h2>
              <span className="text-xs text-slate-400">
                {Object.values(objectsTotals).reduce((a, b) => a + b, 0)} total
              </span>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(objectsTotals).map(([cls, count]) => (
                <li key={cls} className="rounded-lg border border-white/10 p-3 bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{cls}</div>
                    <span className="badge bg-blue-400/20 text-blue-200 border-blue-400/30">{count}</span>
                  </div>
                  <div className="progress mb-2">
                    <span style={{ width: `${Math.max(0, Math.min(100, (count as number) * 10))}%` }} />
                  </div>
                  <div className="text-xs text-slate-300/80">apariciones acumuladas en el video</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400 mt-8">
        © {new Date().getFullYear()} ROVER.AI — Todos los derechos reservados
      </footer>
    </main>
  );
}

function EmptyBox({ hint }: { hint: string }) {
  return (
    <div className="h-64 grid place-items-center rounded-lg border border-dashed border-white/20 text-slate-300/80 text-sm bg-white/5">
      {hint}
    </div>
  );
}
