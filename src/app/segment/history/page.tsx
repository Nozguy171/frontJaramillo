"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import { listUnifiedHistory, toAbs, type HistoryRow } from "@/lib/visionApi";

export default function SegmentHistoryPage() {
  return (
    <RequireAuth>
      <HistoryContent />
    </RequireAuth>
  );
}

function HistoryContent() {
  const [rows, setRows] = useState<HistoryRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const data = await listUnifiedHistory();
        setRows(data);
      } catch (e: any) {
        setErr(e?.response?.data?.error || e?.message || "No se pudo cargar el historial.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
            href="/segment"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-gradient-to-tr from-emerald-400 to-blue-500 shadow-lg hover:brightness-110 active:scale-[.98] transition"
          >
            ← Volver a segmentar
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Historial de segmentaciones</h1>
        </div>

        {loading && <div className="text-sm text-slate-300">Cargando…</div>}
        {err && <div className="text-sm text-red-400">{err}</div>}
        {rows && rows.length === 0 && (
          <div className="text-sm text-slate-300/80">
            No hay archivos aún. Sube uno en la pantalla de segmentación.
          </div>
        )}

        {rows && rows.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rows.map((r) => {
              const thumb = toAbs(r.overlay_url || r.original_url)!;
              return (
                <Link
                  key={`${r.kind}-${r.id}`}
                  href={`/segment/history/${r.kind}/${r.id}`}
                  className="block rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:shadow-2xl hover:brightness-110 transition"
                  title="Ver detalles"
                >
                  <div className="aspect-video bg-black/30 relative">
                    {r.kind === "video" ? (
                      <video
                        src={thumb}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={thumb}
                        alt={`${r.kind} ${r.id}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <span className="absolute left-2 top-2 text-xs px-2 py-0.5 rounded-full bg-black/70 text-white border border-white/10">
                      {r.kind.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-3 text-sm">
                    <div className="font-semibold capitalize">{r.kind} #{r.id}</div>
                    <div className="text-slate-300/80">{new Date(r.created_at).toLocaleString()}</div>
                    {r.overlay_url ? (
                      <div className="mt-1 inline-flex items-center gap-2 text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Tiene resultado
                      </div>
                    ) : (
                      <div className="mt-1 text-slate-400">Solo original</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400 mt-8">
        © {new Date().getFullYear()} ROVER.AI — Todos los derechos reservados
      </footer>
    </main>
  );
}
