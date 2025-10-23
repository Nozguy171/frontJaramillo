"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import { getUnifiedDetail, toAbs, type SegmentObject } from "@/lib/visionApi";
import ObjectExtras from "@/components/ObjectExtras";

export default function SegmentHistoryDetailPage() {
  return (
    <RequireAuth>
      <DetailContent />
    </RequireAuth>
  );
}

function DetailContent() {
  const params = useParams<{ kind: string; id: string }>();
  const kind = (params?.kind as "image" | "video") || "image";
  const id = Number(params?.id);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    let stop = false;

    async function loadOnce() {
      try {
        setLoading(true);
        setErr(null);
        const res = await getUnifiedDetail(kind, id);
        if (!stop) setData(res);
      } catch (e: any) {
        if (!stop) setErr(e?.response?.data?.error || e?.message || "No se pudo cargar el detalle.");
      } finally {
        if (!stop) setLoading(false);
      }
    }

    loadOnce();

    let timer: any;
    if (kind === "video") {
      timer = setInterval(async () => {
        try {
          const res = await getUnifiedDetail(kind, id);
          const last = res?.results?.[0];
          if (last?.overlay_url) {
            setData(res);
            clearInterval(timer);
          }
        } catch {}
      }, 2000);
    }

    return () => {
      stop = true;
      if (timer) clearInterval(timer);
    };
  }, [id, kind]);

  const last = data?.results?.[0];
  const overlayUrlAbs = useMemo(() => toAbs(last?.overlay_url), [last]);
  const objectsTotals: Record<string, number> | null =
    kind === "video" ? (last?.objects_totals || last?.meta?.totals || null) : null;

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
          <div className="flex gap-2">
            <Link
              href="/segment/history"
              className="text-sm px-3 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15"
            >
              ← Historial
            </Link>
            <Link
              href="/segment"
              className="text-sm px-3 py-2 rounded-lg text-black bg-gradient-to-tr from-emerald-400 to-blue-500 shadow-lg hover:brightness-110"
            >
              Segmentar otra
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Detalle {kind} #{id}
          </h1>
        </div>

        {loading && <div className="text-sm text-slate-300">Cargando…</div>}
        {err && <div className="text-sm text-red-400">{err}</div>}

        {data && (
          <>
            {/* Antes / Después */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-3">
                <div className="font-semibold mb-2">Antes (original)</div>
                {kind === "image" ? (
                  <img src={toAbs(data.original_url)} alt="original" className="w-full rounded-lg border border-white/10" />
                ) : (
                  <video src={toAbs(data.original_url)} controls className="w-full rounded-lg border border-white/10" />
                )}
              </div>

              <div className="card p-3">
                <div className="font-semibold mb-2">Después (último resultado)</div>
                {last?.overlay_url ? (
                  kind === "image" ? (
                    <img src={toAbs(last.overlay_url)} alt="overlay" className="w-full rounded-lg border border-white/10" />
                  ) : (
                    <video src={overlayUrlAbs!} controls className="w-full rounded-lg border border-white/10" />
                  )
                ) : (
                  <div className="text-sm text-slate-300/80">— Sin resultados aún (si es video, espera unos segundos)</div>
                )}
              </div>
            </div>

            {/* Imagen: objetos */}
            {kind === "image" && (
              <section className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold">Objetos detectados</h2>
                  <span className="text-xs text-slate-400">
                    {Array.isArray(last?.objects) ? last.objects.length : 0} elementos
                  </span>
                </div>

                {Array.isArray(last?.objects) && last.objects.length ? (
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(last.objects as SegmentObject[]).map((o: SegmentObject, i: number) => (
                      <li key={i} className="rounded-lg border border-white/10 p-3 bg-white/5">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">{o.class}</div>
                          <span className="badge bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                            conf {(o.score * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="progress mb-2">
                          <span style={{ width: `${Math.max(0, Math.min(100, o.score * 100))}%` }} />
                        </div>
                        {o.bbox && (
                          <div className="text-xs text-slate-300/80">
                            bbox: [{o.bbox.map((v) => v.toFixed(1)).join(", ")}]
                          </div>
                        )}
                        <ObjectExtras o={o} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-24 grid place-items-center rounded-lg border border-dashed border-white/20 text-slate-300/80 text-sm">
                    No hay detecciones en este resultado.
                  </div>
                )}
              </section>
            )}

            {/* Video: resumen */}
            {kind === "video" && objectsTotals && (
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
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400 mt-8">
        © {new Date().getFullYear()} ROVER.AI — Todos los derechos reservados
      </footer>
    </main>
  );
}
