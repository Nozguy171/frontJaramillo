// lib/manualApi.ts
import { api } from "./api";

// ---- FIX: asegurar URLs absolutas ----
function fixUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("http")) return url; // ya es absoluta
  return "http://localhost:5051" + url;   // forzar backend real
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

  if (data.results) {
    data.results = data.results.map((r: any) => ({
      ...r,
      annotations: r.annotations ?? [],
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
