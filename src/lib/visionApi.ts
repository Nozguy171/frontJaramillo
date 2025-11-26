// visionApi.ts
import { api } from "@/lib/api";

export type SegmentObject = {
  id: number;
  class: string;
  score: number;
  bbox: [number, number, number, number];
  polygon?: number[][];
  obb?: {
    center?: [number, number];
    size?: [number, number];
    angle?: number;
    box?: [number, number][];
  };
  obb_det?: {
    class?: string;
    score?: number;
    quad?: [number, number][];
    xywhr?: [number, number, number, number, number];
    aabb?: [number, number, number, number];
    iou_with_det?: number;
  };
  pose?: {
    kpts: [number, number, number][];
    bbox_from_kpts?: [number, number, number, number];
  };
  mask_b64?: string;
};

export type SegmentResponse = {
  objects: SegmentObject[];
  overlay_jpg_b64?: string;
  saved?: boolean;
  image?: {
    id: number;
    original_url: string;
    overlay_url?: string;
    width: number;
    height: number;
    result_id?: number;
  };
};

const PROXY_BASE = "/api/proxy";
const BACKEND_ORIGIN =
  (process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, "") ||
    "http://localhost:5051") as string;
export function toAbs(url?: string | null): string | undefined {
  if (!url) return undefined;

  // Si ya está proxificada NO la vuelvas a proxificar
  if (url.includes("/api/proxy/")) return url;

  // URLs data: o blob: NO pasan por proxy
  if (/^(data:|blob:)/i.test(url)) return url;

  try {
    const base = new URL(BACKEND_ORIGIN);
    const full = new URL(url, base);

    // Si la URL pertenece al backend → proxificar una sola vez
    if (full.origin === base.origin) {
      return `${PROXY_BASE}${full.pathname}${full.search}`;
    }

    return full.toString();
  } catch {
    // URLs que empiezan con "/" → proxificar una sola vez
    if (url.startsWith("/")) return `${PROXY_BASE}${url}`;

    return url;
  }
}


// ======================================================
// AUTO-SEGMENTACIÓN IMÁGENES
// ======================================================

export async function segmentAuto(
  file: File,
  opts?: { conf?: number; imgsz?: number; save?: boolean }
) {
  const fd = new FormData();
  fd.append("file", file);
  if (opts?.save) fd.append("save", "1");

  const qs = new URLSearchParams();
  if (opts?.conf != null) qs.set("conf", String(opts.conf));
  if (opts?.imgsz != null) qs.set("imgsz", String(opts.imgsz));
  if (opts?.save) qs.set("save", "1");

  const { data } = await api.post<SegmentResponse>(
    `/api/vision/segment/auto?${qs.toString()}`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data;
}

// ======================================================
// IMAGE ASSETS AUTO
// ======================================================

export type ImageRow = {
  id: number;
  original_url: string;
  overlay_url?: string;
  width: number;
  height: number;
  created_at: string;
  last_result_id?: number;
};

export async function listImages(): Promise<ImageRow[]> {
  const { data } = await api.get<ImageRow[]>("/api/vision/images", {
    headers: { "Cache-Control": "no-store" },
  });
  return data;
}

export type ImageDetail = {
  id: number;
  original_url: string;
  width: number;
  height: number;
  results: {
    id: number;
    overlay_url: string;
    objects: SegmentObject[];
    created_at: string;
  }[];
};

export async function getImageDetail(id: number): Promise<ImageDetail> {
  const { data } = await api.get<ImageDetail>(`/api/vision/images/${id}`, {
    headers: { "Cache-Control": "no-store" },
  });
  return data;
}

// ======================================================
// AUTO-SEGMENTACIÓN VIDEO
// ======================================================

export type VideoAcceptedResponse = {
  accepted: boolean;
  message?: string;
  video: {
    id: number;
    original_url: string;
    width: number;
    height: number;
    fps: number;
    duration_sec: number;
  };
};

export async function segmentAutoVideo(
  file: File,
  opts?: { conf?: number; imgsz?: number; save?: boolean; sample?: number }
) {
  const fd = new FormData();
  fd.append("file", file);
  if (opts?.save) fd.append("save", "1");

  const qs = new URLSearchParams();
  if (opts?.conf != null) qs.set("conf", String(opts.conf));
  if (opts?.imgsz != null) qs.set("imgsz", String(opts.imgsz));
  if (opts?.save) qs.set("save", "1");
  if (opts?.sample != null) qs.set("sample", String(opts.sample));

  const { data } = await api.post<VideoAcceptedResponse>(
    `/api/vision/segment/video?${qs.toString()}`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  if (!data?.video?.id) throw new Error("No se recibió id de video.");
  return data;
}

export function isVideoFile(file?: File | null) {
  return !!file && file.type.startsWith("video/");
}

export type VideoDetail = {
  id: number;
  original_url: string;
  width: number;
  height: number;
  fps: number;
  duration_sec: number;
  created_at: string;
  results: {
    id: number;
    overlay_url: string;
    objects_totals?: Record<string, number>;
    meta?: unknown;
    created_at: string;
  }[];
};

export async function getVideoDetail(id: number): Promise<VideoDetail> {
  const { data } = await api.get<VideoDetail>(`/api/vision/videos/${id}`, {
    headers: { "Cache-Control": "no-store" },
  });
  return data;
}

export async function pollVideoUntilReady(
  id: number,
  { intervalMs = 1500, timeoutMs = 10 * 60 * 1000 } = {}
): Promise<{ overlay_url: string; objects_totals?: Record<string, number> }> {
  const t0 = Date.now();
  while (true) {
    const { data } = await api.get<VideoDetail>(`/api/vision/videos/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });

    const last = data?.results?.[0];
    const url = last?.overlay_url;
    if (url) {
      return { overlay_url: url, objects_totals: last?.objects_totals || undefined };
    }

    if (Date.now() - t0 > timeoutMs) {
      throw new Error("Se agotó el tiempo esperando el overlay del video.");
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

// ======================================================
// MANUAL TAGGING
// ======================================================

export type ManualDetail = {
  id: number;
  url: string;
  width: number;
  height: number;
  results: {
    id: number;
    annotations: any[];
    created_at: string;
  }[];
};

export async function getManualDetail(id: number): Promise<ManualDetail> {
  const { data } = await api.get(`/api/manual/images/${id}`, {
    headers: { "Cache-Control": "no-store" },
  });
  return data;
}

// ======================================================
// HISTORIAL UNIFICADO (IMAGEN + VIDEO + MANUAL)
// ======================================================

export type HistoryRow = {
  id: number;
  kind: "image" | "video" | "manual";
  original_url: string;
  overlay_url?: string;
  width: number;
  height: number;
  created_at: string;
  fps?: number;
  duration_sec?: number;
  objects_totals?: Record<string, number>;
};

export async function listUnifiedHistory(): Promise<HistoryRow[]> {
  const { data } = await api.get("/api/history", {
    headers: { "Cache-Control": "no-store" },
  });

  return data.map((r: any) => ({
    ...r,
    original_url: toAbs(r.original_url),
    overlay_url: r.overlay_url ? toAbs(r.overlay_url) : undefined,
  }));
}

export async function getUnifiedDetail(
  kind: "image" | "video" | "manual",
  id: number
) {
  if (kind === "image") return getImageDetail(id);
  if (kind === "video") return getVideoDetail(id);
  return getManualDetail(id);
}
