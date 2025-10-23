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
  (process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, "") || "http://localhost:5051") as string;

export function toAbs(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^(data:|blob:)/i.test(url)) return url;

  try {
    const base = new URL(BACKEND_ORIGIN);
    const full = new URL(url, base);
    if (full.origin === base.origin) {
      return `${PROXY_BASE}${full.pathname}${full.search}`;
    }
    return full.toString();
  } catch {
    if (url.startsWith("/")) return `${PROXY_BASE}${url}`;
    return url;
  }
}

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

export type HistoryRow =
  | (ImageRow & { kind: "image" })
  | ({
      id: number;
      original_url: string;
      overlay_url?: string;
      width: number;
      height: number;
      fps?: number;
      duration_sec?: number;
      created_at: string;
      last_result_id?: number;
      kind: "video";
      objects_totals?: Record<string, number>;
    });

export async function listVideos(): Promise<HistoryRow[]> {
  const { data } = await api.get<any[]>("/api/vision/videos", {
    headers: { "Cache-Control": "no-store" },
  });
  return (data || []).map((r) => ({ kind: "video" as const, ...r }));
}

export async function listUnifiedHistory(): Promise<HistoryRow[]> {
  const [imgs, vids] = await Promise.all([
    listImages().then((arr) => (arr || []).map((r) => ({ kind: "image" as const, ...r }))),
    listVideos(),
  ]);
  return [...imgs, ...vids].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getUnifiedDetail(kind: "image" | "video", id: number) {
  return kind === "image" ? getImageDetail(id) : getVideoDetail(id);
}
