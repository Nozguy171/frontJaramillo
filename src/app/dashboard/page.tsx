"use client";
import { AuthGuard } from "@/components/RouteGuards";
import { useEffect, useState } from "react";
import { meRequest } from "@/lib/api";
import { getToken, clearAuth } from "@/lib/authStorage";
import { Button } from "@/components/ui/button";

function DashboardContent() {
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    const t = getToken();
    if (!t) return;
    meRequest().then(setMe).catch(() => {});
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {me ? (
        <div className="space-y-2">
          <p><b>ID:</b> {me.id}</p>
          <p><b>Correo:</b> {me.correo}</p>
          <p><b>Creado en:</b> {new Date(me.creado_en).toLocaleString()}</p>
          <Button className="mt-4" onClick={() => { clearAuth(); location.href="/login"; }}>
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <p>Cargando…</p>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
