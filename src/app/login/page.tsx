"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { saveAuth } from "@/lib/authStorage";
import { loginRequest } from "@/lib/api";
import { GuestGuard } from "@/components/RouteGuards";
import { useState } from "react";

export default function LoginPage() {
  return (
    <GuestGuard>
      <LoginForm />
    </GuestGuard>
  );
}

function LoginForm() {
  const search = useSearchParams();
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await loginRequest(correo, password);
      saveAuth(res.access_token, res.usuario.correo, remember);
      const next = search.get("next");
      router.replace(next || "/segment");
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">

      {/* FORM */}
      <section className="flex-1 grid place-items-center px-6 py-16">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-2xl space-y-6"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white text-center">Iniciar sesión</h1>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 select-none">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-emerald-400"
              />
              Recuérdame
            </label>
            <Link href="/signup" className="text-emerald-400 hover:underline font-medium">
              Crear cuenta
            </Link>
          </div>

          {errorMsg && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold text-black shadow-lg transition
              ${loading ? "bg-emerald-300 cursor-not-allowed" : "bg-gradient-to-tr from-emerald-400 to-blue-500 hover:brightness-110 active:scale-[.98]"}`}
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </section>

      <footer className=" border-white/10 py-24 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ACKER — Todos los derechos reservados
      </footer>
    </main>
  );
}
