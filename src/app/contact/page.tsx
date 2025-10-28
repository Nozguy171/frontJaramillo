// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="min-h-screen text-white"> {/* sin bg-black */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold">Contáctanos</h1>
          <p className="text-slate-300 mt-3">
            ¿Te gustaría saber más sobre ACKER y cómo puede transformar tu proceso agrícola?
            Escríbenos y descubre cómo nuestra tecnología puede adaptarse a tu cultivo o proyecto.
          </p>
        </div>

        {/* Panel glass para NO cubrir el gradiente */}
        <form className="card p-5 space-y-3">
          <input className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" placeholder="Nombre" />
          <input className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" placeholder="Email" />
          <input className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" placeholder="Cultivo / Superficie" />
          <textarea className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" rows={5} placeholder="Cuéntanos tu caso" />
          <button className="px-4 py-2 rounded-md bg-red-700 font-semibold hover:bg-red-600">Enviar</button>
        </form>
      </section>
    </main>
  );
}
