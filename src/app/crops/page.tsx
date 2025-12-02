import Link from "next/link";
import { cropMeta } from "@/lib/crops";

export default function Crops() {
  const entries = Object.entries(cropMeta);

  return (
    <div>
    <section className="relative">
  <div
    className="
      absolute inset-0
      bg-[url('/fondo2.jpeg')]
      bg-cover bg-center bg-no-repeat bg-fixed
    "
  />
    <div className="absolute inset-0 bg-black/50" />
      <section className="px-6 pt-10 pb-6 relative">

        <div className="mx-auto max-w-7xl relative">
          <p className="text-emerald-300/90 font-semibold">🌾 Presentamos a ACKER</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Liderando el camino en robótica agrícola inteligente
            </span>
          </h1>
          <p className="mt-4 text-slate-300 max-w-3xl">
            ACKER es una plataforma robótica multifuncional creada para transformar la agricultura de precisión.
            Combina visión por computadora, inteligencia artificial y navegación autónoma para realizar tareas
            de monitoreo, mapeo y asistencia agrícola de forma sostenible, eficiente y segura.
          </p>
        </div>
        
      </section>

      <section className="px-6 py-10 relative" >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold">🌱 Inteligencia de Cultivo</h2>
          <p className="mt-3 text-slate-300 max-w-3xl">
            ACKER promueve cultivos más sanos y sostenibles, optimizando el rendimiento, reduciendo pérdidas
            y mejorando la toma de decisiones agrícolas. Su sistema de visión multi-YOLO, junto con datos de IMU
            y sensores de campo, identifica el estado de las plantas, detecta anomalías y genera información precisa.
          </p>
        </div>
      </section>
</section>
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Cultivos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map(([slug, c]) => (
              <Link key={slug} href={`/crops/${slug}`} className="group card overflow-hidden">
<div className="aspect-[4/3] overflow-hidden">
  <img
    src={c.img}
    alt={c.name}
    className="w-full h-full object-cover group-hover:scale-105 transition"
  />
</div>

                <div className="p-4">
                  <h3 className="font-semibold group-hover:underline">{c.name}</h3>
                  <p className="text-sm text-slate-300 mt-1">{c.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="mx-auto max-w-7xl grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-4">
            <h4 className="font-semibold">Sostenibilidad</h4>
            <p className="text-sm text-slate-300 mt-1">
              Cero emisiones durante la operación y reducción drástica del uso de agroquímicos.
            </p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold">Rentabilidad</h4>
            <p className="text-sm text-slate-300 mt-1">
              Menos dependencia de mano de obra y disminución de costos por hectárea.
            </p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold">Sistema Modular</h4>
            <p className="text-sm text-slate-300 mt-1">
              Arquitectura adaptable a distintos cultivos, herramientas y configuraciones.
            </p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold">Autonomía</h4>
            <p className="text-sm text-slate-300 mt-1">
              Planificación A* y navegación por visión (Fuzzy-PPO) para operar incluso sin GNSS.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-2">
          <div className="card p-5">
            <h3 className="text-lg font-semibold">⚙️ Máxima Adaptabilidad en el Campo</h3>
            <p className="mt-2 text-sm text-slate-300">
              Cada robot puede trabajar de forma independiente o cooperativa en un enjambre,
              coordinado por un Agente Central que gestiona rutas, misiones y métricas.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-semibold">Invernaderos y Túneles Agrícolas</h3>
            <p className="mt-2 text-sm text-slate-300">
              Se desplaza automáticamente de hilera en hilera mientras recopila datos microclimáticos
              y visuales del cultivo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-3">
          <div className="card p-5">
            <h3 className="text-lg font-semibold">🧩 Solucionando Desafíos Críticos</h3>
            <p className="mt-2 text-sm text-slate-300">
              Responde a problemas de escasez de mano de obra, sostenibilidad, productividad y seguridad alimentaria
              con autonomía inteligente y visión avanzada.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-semibold">🤝 Todo se trata de colaboración</h3>
            <p className="mt-2 text-sm text-slate-300">
              Nos asociamos con agricultores, universidades y centros de innovación para construir soluciones abiertas,
              accesibles y escalables.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-semibold">🌎 Nuestros Aliados</h3>
            <p className="mt-2 text-sm text-slate-300">
              Participación en proyectos de innovación y formación académica en robótica aplicada y agricultura de precisión.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
