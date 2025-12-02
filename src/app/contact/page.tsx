// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* 🔥 VIDEO DE FONDO */}
      <video
        src="/videos/vid6.mp4"   // ← pon aquí tu video
        autoPlay
        loop
        muted
        playsInline
        className="
          absolute inset-0 w-full h-full object-cover
          -z-20
        "
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] -z-10" />

      {/* CONTENIDO */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8 z-10">
        <div>
          <h1 className="text-4xl font-bold">Contáctanos</h1>
          <p className="text-slate-300 mt-3">
            ¿Te gustaría saber más sobre ACKER y cómo puede transformar tu proceso agrícola?
            Escríbenos y descubre cómo nuestra tecnología puede adaptarse a tu cultivo o proyecto.
          </p>
        </div>

        {/* Panel glass */}
        <form className="relative card p-5 space-y-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl z-10">
          <input className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" placeholder="Nombre" />
          <input className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" placeholder="Email" />
          <input className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" placeholder="Cultivo / Superficie" />
          <textarea className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" rows={5} placeholder="Cuéntanos tu caso" />
          <button className="px-4 py-2 rounded-md bg-red-700 font-semibold hover:bg-red-600">Enviar</button>
        </form>
      </section>

    </main>
  );
}
