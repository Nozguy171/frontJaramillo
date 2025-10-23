"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupRequest } from "@/lib/api";
import { GuestGuard } from "@/components/RouteGuards";
import { useState } from "react";

export default function SignupPage() {
  return (
    <GuestGuard>
      <SignupForm />
    </GuestGuard>
  );
}

function SignupForm() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);
      await signupRequest(correo, password);
      router.push("/login");
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.error || "Error al crear cuenta");
    } finally {
      setLoading(false);
    }
  }

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
          <nav className="flex items-center gap-3">
            <Link href="/login" className="px-5 py-2 text-sm font-semibold text-white/90 hover:text-white transition">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-tr from-emerald-500 to-blue-500 text-black shadow-lg hover:brightness-110 active:scale-[.98] transition"
            >
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      {/* FORM */}
      <section className="flex-1 grid place-items-center px-6 py-16">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-2xl space-y-6"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white text-center">
            Crear cuenta
          </h1>

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

          {errorMsg && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold text-black shadow-lg transition
              ${loading ? "bg-emerald-300 cursor-not-allowed" : "bg-gradient-to-tr from-emerald-400 to-blue-500 hover:brightness-110 active:scale-[.98]"}`}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          <p className="text-sm text-center text-slate-300">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-emerald-400 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ROVER.AI — Todos los derechos reservados
      </footer>
    </main>
  );
}
