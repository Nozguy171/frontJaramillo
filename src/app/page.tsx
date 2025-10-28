"use client";

import StickySubnav from "@/components/landing/StickySubnav";
import RoverVariantsTabs from "@/components/landing/RoverVariantsTabs";
import FeatureOverlapLocalVideo from "@/components/landing/FeatureOverlapLocalVideo";
import ModuleCarousel from "@/components/landing/ModuleCarousel";
import SpecGrid from "@/components/landing/SpecGrid";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

function IntroAcker() {
  return (
    <section id="intro" className="mx-auto max-w-6xl px-6 pt-12 pb-6">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🌾 Presentamos a ACKER
          </span>
        </h1>
        <p className="mt-3 text-lg md:text-xl text-slate-200">Liderando el camino en robótica agrícola inteligente</p>
      </header>

      <p className="mt-6 text-slate-300 leading-relaxed max-w-3xl mx-auto">
        ACKER es una plataforma robótica multifuncional creada para transformar la agricultura de precisión. Combina visión por
        computadora, inteligencia artificial y navegación autónoma para realizar tareas de monitoreo, mapeo y asistencia agrícola
        de forma sostenible, eficiente y segura.
      </p>
    </section>
  );
}

function CropIntelligence() {
  const items = [
    {
      title: "ACKER para Lechuga",
      body:
        "Navega entre hileras de forma autónoma, monitoreando el crecimiento y la densidad del follaje. Detecta estrés hídrico o deficiencias nutricionales, ayudando a decisiones más precisas.",
      img: "/home/lettuce.jpg",
    },
    {
      title: "ACKER para Maíz",
      body:
        "Con visión estereoscópica y aprendizaje por refuerzo difuso, sigue las hileras con precisión incluso con sombra, maleza o terreno irregular. Recolecta datos fenotípicos a gran escala.",
      img: "/home/corn.jpg",
    },
    {
      title: "ACKER para Col y Brásicas",
      body:
        "Usando segmentación y estimación de pose, identifica cada planta y analiza su desarrollo para conteo automatizado, monitoreo de salud y planificación de cosecha.",
      img: "/home/brassica.jpg",
    },
  ];

  return (
    <section id="inteligencia" className="mx-auto max-w-7xl px-6 py-14">
      <header className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🌱 Inteligencia de Cultivo
          </span>
        </h2>
        <p className="mt-3 text-slate-300">
          ACKER optimiza rendimiento, reduce pérdidas y mejora la toma de decisiones. La visión multi-YOLO junto a GPS, IMU y sensores de campo
          permite detectar anomalías y generar información precisa para el productor.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((x) => (
          <article key={x.title} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.07] transition">
            <div className="aspect-[4/3] border-b border-white/10">
              <img src={x.img} alt={x.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">{x.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{x.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValuePillars() {
  const vals = [
    {
      t: "Sostenibilidad",
      d: "Cero emisiones en operación y reducción del uso de agroquímicos mediante tratamientos y monitoreo de precisión.",
    },
    {
      t: "Rentabilidad",
      d: "Menor dependencia de mano de obra y disminución de costos por hectárea gracias a la autonomía y el análisis inteligente.",
    },
    {
      t: "Sistema Modular",
      d: "Arquitectura modular que se adapta a distintos cultivos, herramientas y configuraciones —de invernaderos a campo abierto.",
    },
    {
      t: "Autonomía",
      d: "Planificación A* + visión multi-YOLO + Fuzzy-PPO para desplazamiento seguro y preciso incluso sin señal GNSS.",
    },
  ];
  return (
    <section id="valores" className="mx-auto max-w-7xl px-6 py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vals.map((v) => (
            <div key={v.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xl font-semibold">{v.t}</h3>
              <p className="mt-2 text-slate-300">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Adaptability() {
  return (
    <section id="adaptabilidad" className="mx-auto max-w-7xl px-6 pt-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src="/home/adapt.jpg" alt="ACKER en invernadero y campo" className="w-full h-auto object-cover" />
        </div>
        <aside className="lg:col-span-5">
          <div className="bg-white text-slate-800 rounded-2xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,.35)] p-6 md:p-7">
            <h3 className="text-2xl font-semibold">⚙️ Máxima Adaptabilidad en el Campo</h3>
            <p className="mt-3 text-slate-600">
              ACKER puede personalizarse para distintos cultivos y entornos. Cada robot trabaja de forma independiente o cooperativa en un enjambre,
              coordinado por un Agente Central que gestiona rutas, misiones y métricas.
            </p>
            <div className="mt-4 text-sm text-slate-700">
              <div className="font-semibold">Invernaderos y Túneles Agrícolas</div>
              <p className="mt-1">
                Se desplaza automáticamente de hilera en hilera mientras recopila datos microclimáticos y visuales del cultivo.
              </p>
              <div className="mt-3">
                <Link href="/platform#greenhouses" className="underline underline-offset-2 decoration-slate-400 hover:decoration-slate-700">
                  Más →
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ChallengesAndCollab() {
  return (
    <section id="historia" className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-semibold">🧩 Solucionando Desafíos Críticos</h3>
          <p className="mt-3 text-slate-300">
            ACKER nació como un proyecto de investigación aplicada para automatizar tareas críticas del campo: navegación, monitoreo y toma de datos.
            Responde a retos actuales: escasez de mano de obra, sostenibilidad, productividad y seguridad alimentaria.
          </p>
          <p className="mt-3 text-slate-300">
            Hoy, ACKER evoluciona como una plataforma integral que combina robustez mecánica, autonomía inteligente y visión avanzada, contribuyendo a un modelo agrícola más
            eficiente y resiliente.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-semibold">🤝 Todo se trata de colaboración</h3>
          <p className="mt-3 text-slate-300">
            Nuestra misión es transformar la agricultura en un sector más tecnológico, rentable y sostenible, reduciendo riesgos y mejorando la calidad de los alimentos.
            Visualizamos un futuro con robots cooperativos ACKER inspeccionando cultivos, aplicando tratamientos de precisión y realizando tareas repetitivas sin impacto ambiental.
          </p>
        </article>
      </div>
    </section>
  );
}

function Allies() {
  return (
    <section id="aliados" className="mx-auto max-w-7xl px-6 py-14">
      <header className="max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-bold">🌎 Nuestros Aliados</h3>
        <p className="mt-2 text-slate-300">
          Colaboramos con universidades, productores y centros de investigación para desarrollar herramientas y metodologías de automatización agrícola.
          Presentes en proyectos de innovación, agricultura sostenible y formación académica en robótica aplicada.
        </p>
      </header>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-slate-300">
          <div className="font-semibold">Universidades Asociadas</div>
          <p className="mt-2">
            El proyecto ACKER colabora con instituciones en México y América Latina, integrando líneas de investigación en visión artificial, IA, robótica móvil y agricultura de precisión.
          </p>
        </div>
        {/* Grid de logos opcional */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 opacity-80">
          {/* Reemplaza /logos/*.svg por tus archivos */}
          {["/logos/u1.svg","/logos/u2.svg","/logos/u3.svg","/logos/u4.svg","/logos/u5.svg","/logos/u6.svg"].map((src, i) => (
            <div key={i} className="h-12 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <img src={src} alt={`logo-${i}`} className="max-h-8 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamTeaser() {
  return (
    <section id="equipo" className="mx-auto max-w-6xl px-6 py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl md:text-3xl font-bold">👨‍🔬 El Equipo ACKER</h3>
        <p className="mt-3 text-slate-300">
          Equipo multidisciplinario de investigadores, ingenieros y tecnólogos que integran ciencia, ingeniería y sostenibilidad. Queremos llevar la
          inteligencia robótica al campo — del laboratorio a la cosecha.
        </p>
        <div className="mt-5">
          <Link href="/about#equipo" className="inline-flex items-center px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10">
            Más →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <StickySubnav
        items={[
          { id: "environments", label: "Plataformas" },
          { id: "intro", label: "Presentación" },
          { id: "inteligencia", label: "Inteligencia de cultivo" },
          { id: "videos", label: "Videos" },
          { id: "valores", label: "Valores" },
          { id: "adaptabilidad", label: "Adaptabilidad" },
          { id: "historia", label: "Historia" },
          { id: "aliados", label: "Aliados" },
          { id: "equipo", label: "Equipo" },
        ]}
      />

      {/* Tabs Base / Pequeña escala (encima del robot) */}
      <RoverVariantsTabs />

      {/* Presentación (overview) */}
      <IntroAcker />

      {/* Inteligencia de cultivo (3 tarjetas) */}
      <CropIntelligence />

      {/* Videos: overlap animado (izq y der) */}
      <section id="videos" className="scroll-mt-24">
        <FeatureOverlapLocalVideo
          id="video-1"
          previewSrc="/feature-field.jpg"
          title="Monitoreo autónomo con mapas fenotípicos"
          body={<>Visión multi-YOLO + sensores ambientales; salud del cultivo sin GNSS.</>}
          videoSrc="/demo.mp4"
          poster="/feature-field.jpg"
          offsetX={80}
          offsetY={-60}
          hardOverlap={80}
          radius={28}
          aspect="16 / 9"
          showFullscreenButton
          // (default) align = "video-left"
        />

        <FeatureOverlapLocalVideo
          id="video-2"
          align="video-right"
          groupShiftX={-80}
          previewSrc="/feature-greenhouse.jpg"
          title="Operación precisa en invernaderos y túneles"
          body={<>Cambio automático de hilera y captura de datos microclimáticos y visuales con optimización en tiempo real.</>}
          videoSrc="/demo-greenhouse.mp4"
          poster="/feature-greenhouse.jpg"
          offsetX={70}
          offsetY={-50}
          hardOverlap={72}
          radius={28}
          aspect="16 / 9"
          showFullscreenButton
        />
      </section>

      {/* Valores / pilares */}
      <ValuePillars />

      {/* Adaptabilidad (split con CTA) */}
      <Adaptability />

      {/* Desafíos críticos + Colaboración */}
      <ChallengesAndCollab />

      {/* Aliados / Universidades */}
      <Allies />

      {/* Team teaser */}
      <TeamTeaser />


      {/* Cierre CTA y Footer */}
      <CTA />
      <Footer />
    </main>
  );
}
