"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { getToken } from "@/lib/authStorage";
import { meRequest } from "@/lib/api";

export default function LandingRover() {
  const router = useRouter();

  const onTryModel = useCallback(async () => {
    const t = getToken();
    if (!t) {
      router.push("/login");
      return;
    }
    try {
      await meRequest();
      router.push("/segment");
    } catch {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overscroll-none">
      <Header />
      <Hero onTryModel={onTryModel} />
      <EnvStrip />

      {/* FEATURE STORY — card a la derecha */}
      <FeatureStory
        img="/feature-field.jpg"
        video="/demo.mp4"
        align="right"
        title="Cómo pasamos del juego a resolver problemas reales con robótica"
        body={
          <>
            Con <span className="font-semibold">ROVER.AI</span> combinamos visión por
            computadora (YOLO + OBB + pose) con un chasis modular y seguro para cultivos,
            habilitando tareas autónomas precisas y trazables.
          </>
        }
      />

      <Pillars />
      <UvcProcess />
      <Benefits />
      <Specs />
      <Testimonial />

      {/* FEATURE STORY — invertida (card a la izquierda) */}
      <FeatureStory
        img="/feature-vineyard.jpg"
        video="/demo.mp4"
        align="left"
        title="Robótica en viñedos: precisión y cuidado del cultivo"
        body={
          <>
            Planificación de ruta, ejecución autónoma y evidencia visual. Integración
            con historial por lote para auditoría y KPIs de tratamiento.
          </>
        }
      />

      <CtaFinal onTryModel={onTryModel} />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md">
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
  );
}

function Hero({ onTryModel }: { onTryModel: () => void }) {
  return (
    <section className="relative overflow-hidden">
      {/* luces decorativas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10rem] left-[-5rem] h-[25rem] w-[25rem] rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute bottom-[-10rem] right-[-5rem] h-[25rem] w-[25rem] rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 pt-16 pb-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">
            Plataforma autónoma agrícola
          </p>
          <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            PRESENTAMOS{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              ROVER
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
            Vehículo autónomo inteligente para la agricultura moderna. Usa{" "}
            <span className="text-emerald-400 font-semibold">YOLO</span> (segmentación) con{" "}
            <span className="text-emerald-400 font-semibold">OBB</span> y{" "}
            <span className="text-emerald-400 font-semibold">pose tracking</span> para orientación y movimiento.
          </p>

          {/* chips entornos */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["Polytunnels", "Open field", "Vineyards"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onTryModel}
              className="px-8 py-3 rounded-xl text-sm font-semibold bg-gradient-to-tr from-emerald-400 to-blue-500 text-black shadow-lg hover:brightness-110 active:scale-[.97] transition"
            >
              🚀 Probar el modelo ahora
            </button>
            <Link href="/segment" className="px-8 py-3 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/10 transition">
              Ver demo
            </Link>
          </div>
        </div>

        {/* Imagen hero */}
        <div className="relative group">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/rover-hero.jpg"
              alt="Rover AI detectando cultivos"
              width={1200}
              height={800}
              className="w-full h-auto aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority
            />
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/10 shadow-sm">
            YOLO v8 • Powered by AI
          </div>
        </div>
      </div>
    </section>
  );
}

function EnvStrip() {
  const items = [
    { src: "/entorno-polytunnel.jpg", label: "Polytunnels" },
    { src: "/entorno-openfield.jpg", label: "Open field" },
    { src: "/entorno-vineyard.jpg", label: "Vineyards" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((x) => (
          <div key={x.label} className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <Image src={x.src} alt={x.label} width={900} height={600} className="w-full h-40 sm:h-52 object-cover" />
            <span className="absolute left-3 bottom-3 text-xs px-2.5 py-1 rounded-full bg-black/60 text-white border border-white/10">
              {x.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
function FeatureStory({
  img,
  video,
  align = "right",
  title,
  body,
}: {
  img: string;
  video: string;
  align?: "right" | "left";
  title: string;
  body: React.ReactNode;
}) {
  const alignClass =
    align === "right"
      ? "md:ml-auto md:mr-6"
      : "md:mr-auto md:ml-6";

  return (
    <section className="mx-auto max-w-7xl px-6 pt-10 pb-16">
      {/* Bloque imagen */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <Image
          src={img}
          alt="Operación en campo"
          width={1600}
          height={900}
          className="w-full h-auto object-cover"
          priority
        />
        {/* botón play encima de la imagen */}
        <button
          type="button"
          aria-label="Reproducir video"
          className="group absolute inset-0 grid place-items-center"
          onClick={() =>
            (document.getElementById(`video-modal-${align}`) as HTMLDialogElement | null)?.showModal()
          }
        >
          <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 shadow-xl group-hover:scale-105 transition">
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-black">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>

      {/* Card: en flujo (no absolute). Se “monta” visualmente con -mt pero empuja el layout */}
      <div
        className={[
          "relative z-10",
          "-mt-6 sm:-mt-10 md:-mt-16 lg:-mt-24",
          "w-full max-w-md md:max-w-lg",
          "bg-white text-slate-800 rounded-2xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,.35)]",
          "p-6 md:p-7 lg:p-8",
          "isolate",
          alignClass,
        ].join(" ")}
      >
        <h3 className="text-2xl md:text-[28px] lg:text-[30px] font-semibold leading-[1.15]">
          {title}
        </h3>
        <p className="mt-3 text-[15px] md:text-base text-slate-600 leading-relaxed">
          {body}
        </p>
        <div className="mt-5 flex gap-3">
          <Link
            href="/segment"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            Ver demo →
          </Link>
          <Link
            href="/segment/history"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 text-slate-800 hover:bg-slate-50 transition"
          >
            Historial
          </Link>
        </div>
      </div>

      {/* Modal de video */}
      <dialog id={`video-modal-${align}`} className="backdrop:bg-black/60 rounded-xl p-0 border-0 w-[min(960px,92vw)]">
        <div className="bg-black rounded-xl overflow-hidden">
          <div className="flex justify-end p-2">
            <button
              onClick={() =>
                (document.getElementById(`video-modal-${align}`) as HTMLDialogElement)?.close()
              }
              className="px-3 py-1.5 text-sm rounded-md bg-white/10 text-white hover:bg-white/20"
            >
              Cerrar
            </button>
          </div>
          <video src={video} controls className="w-full max-h-[70vh] object-contain" />
          <div className="p-4 text-center text-xs text-white/70">Demostración de ROVER.AI</div>
        </div>
      </dialog>
    </section>
  );
}


function Pillars() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Modular",
            desc: "Módulos y herramientas para túneles, campo abierto y viñedos.",
            img: "/modular.jpg",
          },
          {
            title: "Autónomo",
            desc: "UV-C, transporte, conteo y fumigación selectiva sin supervisión.",
            img: "/autonomous.jpg",
          },
          {
            title: "Plant-friendly",
            desc: "Tratamientos precisos (UV-C nocturno) que cuidan el cultivo.",
            img: "/plantfriendly.jpg",
          },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition overflow-hidden">
            <div className="aspect-[16/9] w-full border-b border-white/10">
              <Image src={f.img} alt={f.title} width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UvcProcess() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl md:text-3xl font-bold">UV-C: tratamiento y telemetría</h2>
          <p className="mt-4 text-slate-300">
            Protección contra mildiu con aplicación de UV-C y reporte en tiempo real como parte del programa de tratamiento.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>• Segmentación + OBB para localizar focos</li>
            <li>• Planeación de ruta y ejecución autónoma</li>
            <li>• Evidencia visual (overlay) y KPIs</li>
            <li>• Historial por lote y auditoría</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Link href="/segment" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white/10 border border-white/10 hover:bg-white/15">
              Ver segmentación →
            </Link>
            <Link href="/segment/history" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-400 text-black hover:brightness-110">
              Ver historial
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-3">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <Image src="/uvc-1.jpg" alt="UV-C en operación" width={800} height={600} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <Image src="/uvc-2.jpg" alt="Pipeline y evidencia" width={800} height={600} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="text-2xl md:text-3xl font-bold">Flexible, confiable, autónomo y eficiente</h2>
      <p className="mt-3 text-slate-300 max-w-2xl">
        Diseñado para múltiples entornos y terrenos. Construcción modular con posibilidades casi infinitas.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { t: "All Terrain", d: "Polytunnels, open field y vineyards.", img: "/benefit-1.jpg" },
          { t: "Adaptable", d: "Herramientas y sensores a la medida.", img: "/benefit-2.jpg" },
          { t: "Autónomo", d: "Navegación y tareas sin supervisión.", img: "/benefit-3.jpg" },
          { t: "Confiable", d: "Probado en escenarios reales exigentes.", img: "/benefit-4.jpg" },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="aspect-[4/3] w-full border-b border-white/10">
              <Image src={x.img} alt={x.t} width={640} height={480} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="font-semibold">{x.t}</div>
              <div className="text-sm text-slate-300">{x.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: "640", l: "imgsz máx" },
            { v: "0.25", l: "conf (default)" },
            { v: "≤ 60s", l: "video" },
            { v: "24/7", l: "operación" },
          ].map((s) => (
            <div key={s.l} className="p-3">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {s.v}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-300">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-lg text-slate-200">
          “Vemos la robótica como clave para descarbonizar labores en campo; con robots solares en lugar de tractores.
          Una alianza con ROVER.AI acelera ese futuro en nuestras operaciones.”
        </p>
        <div className="mt-4 text-sm text-slate-400">— Productor en viñedo, Baja California</div>
      </div>
    </section>
  );
}

function CtaFinal({ onTryModel }: { onTryModel: () => void }) {
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
            <Link href="/segment" className="px-5 py-3 rounded-xl font-semibold bg-emerald-400 text-black hover:brightness-110">
              Empezar ahora
            </Link>
            <button onClick={onTryModel} className="px-5 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/10">
              Probar con mi cuenta →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
      © {new Date().getFullYear()} ROVER.AI — Todos los derechos reservados
    </footer>
  );
}
