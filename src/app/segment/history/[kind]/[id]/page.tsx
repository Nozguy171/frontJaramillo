"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import {
  getUnifiedDetail,
  toAbs,
  type SegmentObject,
} from "@/lib/visionApi";
import ObjectExtras from "@/components/ObjectExtras";

type Point = [number, number];

// =======================================================
// PREVIEW GENERATOR
// =======================================================
async function getAnnPreview(ann: any, imgUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      // bounding box universal
      let x1, y1, x2, y2;
      if (ann.type === "bbox") {
        [x1, y1, x2, y2] = ann.bbox;
      } else {
        const xs = ann.points.map((p: any) => p[0]);
        const ys = ann.points.map((p: any) => p[1]);
        x1 = Math.min(...xs);
        y1 = Math.min(...ys);
        x2 = Math.max(...xs);
        y2 = Math.max(...ys);
      }

      const w = Math.max(1, x2 - x1);
      const h = Math.max(1, y2 - y1);

      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, x1, y1, w, h, 0, 0, w, h);

      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };

    img.onerror = () => resolve(null);
  });
}

// =======================================================
// PAGE WRAPPER
// =======================================================
export default function SegmentHistoryDetailPage() {
  return (
    <RequireAuth>
      <DetailContent />
    </RequireAuth>
  );
}

// =======================================================
// CONTENT
// =======================================================
function DetailContent() {
  const params = useParams<{ kind: string; id: string }>();
  const kind = (params?.kind as "image" | "video" | "manual") || "image";
  const id = Number(params?.id);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  // Para resaltar imagen en manual
  const [focusBox, setFocusBox] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  // highlight animation
  useEffect(() => {
    if (!focusBox) return;
    const el = document.getElementById("manual-result-img");
    if (!el) return;

    el.classList.add("ring-4", "ring-primary", "ring-offset-2");

    const timer = setTimeout(() => {
      el.classList.remove("ring-4", "ring-primary", "ring-offset-2");
    }, 350);

    return () => clearTimeout(timer);
  }, [focusBox]);

  // =======================================================
  // LOAD DETAIL
  // =======================================================
  useEffect(() => {
    if (!id) return;

    let stop = false;

    async function loadOnce() {
      try {
        setLoading(true);
        const res = await getUnifiedDetail(kind, id);
        if (!stop) setData(res);
      } catch (e: any) {
        if (!stop) setErr(e?.message || "No se pudo cargar el detalle.");
      } finally {
        if (!stop) setLoading(false);
      }
    }

    loadOnce();

    // Polling SOLO para video
    let timer: any;
    if (kind === "video") {
      timer = setInterval(async () => {
        const res = await getUnifiedDetail("video", id);
        const last = res?.results?.[0];

        if (last && typeof last === "object" && "overlay_url" in last) {
          setData(res);
          clearInterval(timer);
        }
      }, 2000);
    }

    return () => {
      stop = true;
      if (timer) clearInterval(timer);
    };
  }, [id, kind]);

  const last = data?.results?.[0];

  // overlay fix
  const hasOverlay =
    last &&
    typeof last === "object" &&
    "overlay_url" in last &&
    typeof (last as any).overlay_url === "string";

  const overlayUrlAbs =
    kind === "manual"
      ? undefined
      : hasOverlay
      ? toAbs((last as any).overlay_url)
      : undefined;

  // =======================================================
  // MANUAL PREVIEWS
  // =======================================================
  const [previews, setPreviews] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (kind !== "manual") return;
    if (!last?.annotations) return;
    if (!Array.isArray(last.annotations)) return;
    if (!data?.url) return;

    let active = true;

    Promise.all(
      last.annotations.map((ann: any) =>
        getAnnPreview(ann, toAbs(data.url)!)
      )
    ).then((imgs) => {
      if (active) setPreviews(imgs);
    });

    return () => {
      active = false;
    };
  }, [kind, last, data?.url]);

  // =======================================================
  // RENDER UI
  // =======================================================
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">
          Detalle {kind} #{id}
        </h1>

        {loading && <div>Cargando…</div>}
        {err && <div className="text-destructive">{err}</div>}

        {data && (
          <>
            {/* =======================================================
                BEFORE / AFTER
             ======================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ORIGINAL */}
              <div className="card p-3">
                <div className="font-semibold mb-2">Antes</div>

                {kind === "video" ? (
                  <video
                    src={toAbs(data.original_url)}
                    controls
                    className="w-full rounded-lg border"
                  />
                ) : (
                  <img
                    src={toAbs(
                      kind === "manual" ? data.url : data.original_url
                    )}
                    className="w-full rounded-lg border"
                  />
                )}
              </div>

              {/* RESULT */}
              <div className="card p-3">
                <div className="font-semibold mb-2">
                  {kind === "manual" ? "Últimas anotaciones" : "Resultado"}
                </div>

                {kind === "manual" ? (
                  <img
                    id="manual-result-img"
                    src={toAbs(`/api/manual/images/${id}/overlay`)}
                    className="w-full rounded-lg border transition-all duration-300"
                  />
                ) : overlayUrlAbs ? (
                  kind === "image" ? (
                    <img
                      src={overlayUrlAbs}
                      className="w-full rounded-lg border"
                    />
                  ) : (
                    <video
                      src={overlayUrlAbs}
                      controls
                      className="w-full rounded-lg border"
                    />
                  )
                ) : (
                  <div>Sin resultados…</div>
                )}
              </div>
            </div>

            {/* =======================================================
                MANUAL MODE — OBJECT LIST
             ======================================================= */}
            {kind === "manual" && last && (
              <section className="card p-4 mt-6">
                <div className="flex justify-between">
                  <h2 className="font-semibold">Objetos anotados</h2>
                  <span className="text-xs text-muted-foreground">
                    {last.annotations.length} objetos
                  </span>
                </div>

                <ul className="space-y-3 mt-4">
                  {last.annotations.map((ann: any, i: number) => (
                    <li
                      key={i}
                      className="p-3 rounded-lg border bg-card space-y-2 cursor-pointer hover:bg-primary/10 transition"
                      onClick={() => {
                        // bounding box universal
                        let x1, y1, x2, y2;
                        if (ann.type === "bbox") {
                          [x1, y1, x2, y2] = ann.bbox;
                        } else {
                          const xs = ann.points.map((p: any) => p[0]);
                          const ys = ann.points.map((p: any) => p[1]);
                          x1 = Math.min(...xs);
                          y1 = Math.min(...ys);
                          x2 = Math.max(...xs);
                          y2 = Math.max(...ys);
                        }

                        setFocusBox({ x1, y1, x2, y2 });
                      }}
                    >
                      {/* HEADER */}
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          #{i} — {ann.class}
                        </div>
                        <span className="badge bg-primary/20 text-primary">
                          {ann.type}
                        </span>
                      </div>

                      {/* PREVIEW */}
                      {previews[i] && (
                        <div className="relative w-28 h-28 overflow-hidden rounded border bg-black/40">
                          <img
                            src={previews[i]!}
                            className="absolute inset-0 w-full h-full object-contain p-1"
                          />
                          <div className="absolute inset-0 border-2 border-primary/40 rounded pointer-events-none" />
                        </div>
                      )}

                      {/* INFO */}
                      <div className="text-xs text-muted-foreground">
                        {ann.type === "bbox" &&
                          `bbox: [${ann.bbox.join(", ")}]`}
                        {ann.type === "obb" &&
                          `OBB — ángulo ${ann.angle.toFixed(1)}°`}
                        {ann.type === "seg" &&
                          `polígono con ${ann.points.length} puntos`}
                        {ann.type === "pose" &&
                          `${ann.points.length} keypoints`}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* =======================================================
                AI IMAGE MODE
             ======================================================= */}
            {kind === "image" && (
              <section className="card p-4">
                <h2 className="font-semibold mb-3">Objetos detectados</h2>

                {Array.isArray(last?.objects) && last.objects.length > 0 ? (
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {last.objects.map((o: SegmentObject, i: number) => (
                      <li
                        key={i}
                        className="rounded-lg border p-3 bg-card"
                      >
                        <div className="flex justify-between">
                          <div className="font-medium">{o.class}</div>
                          <span className="badge bg-primary/20 text-primary">
                            {Math.round(o.score * 100)}%
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground mt-1">
                          bbox: [{o.bbox.join(", ")}]
                        </div>

                        <ObjectExtras o={o} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No hay objetos</div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
