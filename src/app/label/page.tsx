"use client";

import { useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import { uploadManualImage } from "@/lib/manualApi";
import Link from "next/link";

export default function LabelPage() {
  return (
    <RequireAuth>
      <LabelContent />
    </RequireAuth>
  );
}

function LabelContent() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onPick = (f: File | null) => {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const upload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await uploadManualImage(file);
      window.location.href = `/label/${res.id}`;
    } catch (e: any) {
      setErrorMsg(e?.message || "No se pudo subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-6">

        {/* HEADER */}
        <header>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
            Etiquetado Manual
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary border border-border">
              Imagen
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sube una imagen y comienza a dibujar cajas para etiquetar objetos manualmente.
          </p>
        </header>

        {/* TOOLBAR */}
        <div className="card p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <label className="text-sm w-full sm:w-auto">
            <span className="block text-muted-foreground mb-1">Archivo de imagen</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onPick(e.target.files?.[0] || null)}
              className="block w-full text-sm
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-border
                file:text-sm file:font-semibold
                file:bg-primary file:text-black
                hover:file:bg-primary/90
                active:file:scale-[.98] transition"
            />
          </label>

          <button
            disabled={!file || loading}
            onClick={upload}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-black bg-primary hover:bg-primary/90 shadow-lg transition active:scale-95"
          >
            {loading ? "Subiendo…" : "Usar para etiquetar"}
          </button>
        </div>

        {errorMsg && <p className="text-destructive text-sm">{errorMsg}</p>}

        {/* PREVIEW */}
        {preview && (
          <div className="card p-3">
            <img src={preview} alt="preview" className="w-full rounded-lg border border-border" />
          </div>
        )}

        <Link href="/label/history" className="text-primary hover:underline text-sm">
          Ver historial de etiquetado →
        </Link>
      </div>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground mt-8">
        © {new Date().getFullYear()} ACKER — Todos los derechos reservados
      </footer>
    </main>
  );
}
