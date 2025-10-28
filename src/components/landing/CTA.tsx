import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-4 pb-16">
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">¿Listo para probarlo en tu campo?</h3>
            <p className="mt-2 text-slate-300">
              Sube una imagen o video y obtén overlays, objetos detectados y un historial auditado.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <Link
              href="/segment"
              className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-tr from-emerald-400 to-blue-500 text-black hover:brightness-110"
            >
              Empezar ahora
            </Link>
            <Link
              href="/login"
              className="px-5 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/10"
            >
              Probar con mi cuenta →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
