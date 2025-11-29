// lib/manualApi.ts
import { api } from "./api";

// ---- FIX: asegurar URLs absolutas ----
function fixUrl(url: string): string {
  if (!url) return url;

  // Si ya viene absoluta, no la toques
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  // Base del backend desde el .env
  const BASE =
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN ||
    process.env.BACKEND_URL ||
    "http://127.0.0.1:5051";

  // Unir correctamente, evitando doble //
  return BASE.replace(/\/+$/, "") + url;
}

// =====================
// SUBIR IMAGEN
// =====================
export async function uploadManualImage(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const { data } = await api.post("/api/manual/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  data.url = fixUrl(data.url);
  return data;
}

// =====================
// DETALLE
// =====================
export async function getManualDetail(id: number) {
  const { data } = await api.get(`/api/manual/images/${id}`);

  data.url = fixUrl(data.url);
  data.original_url = fixUrl(data.original_url);

  if (data.results) {
    data.results = data.results.map((r: any) => ({
      ...r,
      annotations: r.annotations ?? [],
      overlay_url: fixUrl(r.overlay_url),
    }));
  }

  return data;
}

// =====================
// GUARDAR ANOTACIONES
// =====================
export async function saveAnnotations(id: number, annotations: any[]) {
  const { data } = await api.post(
    `/api/manual/images/${id}/save`,
    { annotations },
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
}

// =====================
// EXPORTAR JSON
// =====================
export async function exportManualJson(id: number) {
  const { data } = await api.get(`/api/manual/images/${id}/export/json`);
  return data;
}

// =====================
// EXPORTAR YOLO
// =====================
export async function exportManualYolo(id: number) {
  const { data } = await api.get(`/api/manual/images/${id}/export/yolo`);
  return data;
}
