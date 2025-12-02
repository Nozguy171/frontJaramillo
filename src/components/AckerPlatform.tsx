"use client";

import Image from "next/image";
import React from "react";

export default function AckerPlatform() {
  return (
    <section id="acker-platform" className="px-6 py-16 text-white bg-black/60">

      <div className="mx-auto max-w-6xl space-y-16">

        {/* HERO */}
        <header className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Plataforma ACKER
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Donde la biología vegetal se encuentra con la tecnología de vanguardia.
              ACKER es una plataforma robótica modular, multifuncional y autónoma diseñada para transformar el alcance de la agricultura moderna.
              Integra visión artificial, sensores ambientales y control inteligente para realizar tareas de monitoreo, navegación y análisis de cultivos con precisión y sostenibilidad.
            </p>
          </div>
<div className="relative left-44 w-[340px] aspect-[3/4] bg-cover rounded-3xl overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/5">
  <Image
    src="/logo.png"
    alt="Plataforma ACKER en operación"
    fill
    className="object-cover"
    priority
  />
</div>

        </header>

        {/* ENTORNOS */}
        <section id="entornos" className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Entornos de operación
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Invernaderos */}
            <article className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="relative mb-4 aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                <Image src="/platform/invernadero.jpeg" alt="Invernaderos" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Invernaderos</h3>
              <p className="mt-2 text-slate-300">
                ACKER se adapta fácilmente a los espacios reducidos y condiciones controladas de los invernaderos.
                Su sistema de visión multi-YOLO permite detectar el crecimiento, la humedad y la salud de las plantas,
                optimizando el uso de agua y nutrientes en tiempo real.
              </p>
            </article>

            {/* Campo Abierto */}
            <article className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="relative mb-4 aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                <Image src="/platform/abierto.jpeg" alt="Campo Abierto" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Campo Abierto</h3>
              <p className="mt-2 text-slate-300">
                Diseñado para terrenos variables, ACKER opera de manera autónoma entre hileras de cultivos extensivos
                como maíz, lechuga o col. Su sistema de aprendizaje por refuerzo difuso (Fuzzy-PPO) le permite navegar de forma segura,
                ajustándose dinámicamente a la topografía y condiciones del terreno.
              </p>
            </article>

            {/* Viñedos y Hortalizas */}
            <article className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="relative mb-4 aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                <Image src="/platform/hortaliza.jpeg" alt="Viñedos y Hortalizas" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Viñedos y Hortalizas</h3>
              <p className="mt-2 text-slate-300">
                Gracias a su estructura modular y ruedas de tracción independiente, ACKER puede desplazarse por zonas con cultivos frutales o hortalizas de porte bajo.
                Sus sensores ópticos y de profundidad detectan obstáculos, identifican frutos y generan mapas visuales del estado fenotípico del cultivo.
              </p>
            </article>
          </div>
        </section>

        {/* UN SOLO DISEÑO, INFINITAS APLICACIONES */}
        <section id="aplicaciones" className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[5/3] rounded-3xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
            <Image src="/robot2.png" alt="Aplicaciones" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              🌱 Un solo diseño, infinitas aplicaciones
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              La plataforma ACKER fue concebida para crecer junto con las necesidades del agricultor y la investigación.
              Su arquitectura abierta permite incorporar nuevos módulos —como cámaras hiperespectrales, brazos manipuladores o rociadores inteligentes—,
              haciendo de ACKER una herramienta versátil para la agricultura de precisión, la docencia y la innovación científica.
            </p>
          </div>
        </section>

        {/* CONSTRUCCIÓN MODULAR */}
        <section id="modular" className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Modular · Autónomo · Amigable con las plantas
            </h2>
            <h3 className="mt-3 text-xl font-bold">Construcción Modular</h3>
            <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
              <p>
                ACKER representa la unión de múltiples robots en una sola plataforma adaptable.
                Cada unidad está construida a partir de módulos estructurales estandarizados, que pueden ensamblarse, modificarse o ampliarse fácilmente utilizando herramientas básicas.
              </p>
              <p>
                Su diseño modular permite crear robots agrícolas personalizados para distintas aplicaciones y entornos:
                desde invernaderos y túneles hasta campos abiertos o cultivos especializados.
                Los módulos mecánicos, electrónicos y de software se integran bajo un mismo ecosistema, lo que facilita el mantenimiento,
                la actualización y la reutilización de componentes.
              </p>
              <p>
                El resultado es un sistema eficiente, escalable y sostenible, pensado tanto para la investigación como para la producción agrícola real.
                Con ACKER, cada robot puede adaptarse a las necesidades del cultivo, del entorno o del investigador, garantizando siempre un funcionamiento robusto,
                preciso y respetuoso con las plantas.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
            <Image src="/about/f4.jpg" alt="Construcción modular" fill className="object-cover" />
          </div>
        </section>

        {/* PROCESO DE MONITOREO Y CONTROL INTELIGENTE */}
        <section id="proceso" className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Proceso de Monitoreo y Control Inteligente ACKER
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-4xl">
            ACKER protege y optimiza los cultivos mediante el uso de visión artificial, sensores ambientales y aprendizaje automático,
            todo integrado en una red autónoma que recopila, analiza y comparte información en tiempo real.
            Los datos generados por cada robot se envían a la nube, donde son procesados por el Agente Central para generar mapas de cultivo,
            métricas de crecimiento y alertas automáticas sobre el estado del terreno.
          </p>

          {/* Flujo de datos y operación */}
          <div className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h3 className="text-xl font-bold">🔄 Flujo de datos y operación</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
                <h4 className="font-semibold">Transmisión de datos en tiempo real</h4>
                <p className="mt-2 text-slate-300">
                  Los robots ACKER envían información de cámaras y sensores mediante conexión 4G/5G o Wi-Fi,
                  almacenándola de forma segura en la nube.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
                <h4 className="font-semibold">Centro de control y soporte remoto</h4>
                <p className="mt-2 text-slate-300">
                  El Agente Central analiza los datos, coordina la navegación de los robots, planifica rutas y supervisa la ejecución de tareas desde una interfaz centralizada.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
                <h4 className="font-semibold">Programación de tareas adaptativa</h4>
                <p className="mt-2 text-slate-300">
                  El sistema ajusta automáticamente las rutas, frecuencias de muestreo o zonas de observación según las condiciones del cultivo y las necesidades del productor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FLOTA AUTÓNOMA */}
        <section id="flota" className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
  <video
    src="/videos/vid4.mp4"  // ⬅️ pon aquí tu video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover object-center"
  />          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Flota Autónoma ACKER
            </h2>
            <h3 className="mt-2 text-xl font-bold">Sistema Cooperativo de Monitoreo y Navegación Autónoma</h3>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Los robots ACKER operan en conjunto como una flota sincronizada. Cada unidad recopila datos visuales y ambientales,
              los comparte con el resto de la red y ejecuta acciones de forma coordinada.
              Este enfoque distribuido permite mantener una vigilancia constante del campo, detectar problemas tempranos y
              optimizar el uso de recursos agrícolas.
            </p>
          </div>
        </section>

        {/* CUALIDADES / BENEFICIOS */}
        <section id="cualidades" className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Flexible, confiable, autónomo y eficiente.
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-4xl">
            ACKER ha sido diseñado para funcionar en todo tipo de entornos agrícolas y terrenos, desde invernaderos hasta campos abiertos y zonas de cultivo irregular.
            Su arquitectura modular ofrece posibilidades casi infinitas de adaptación, integración de herramientas y personalización de tareas.
            Mientras ACKER ejecuta operaciones agrícolas autónomas, los productores pueden concentrarse en la planificación integral del cultivo y la gestión sostenible del campo.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
              <h3 className="font-bold">🌾 Todo Terreno</h3>
              <p className="mt-2 text-slate-300">
                Diseñado para trabajar en cualquier entorno agrícola: invernaderos, túneles plásticos, campos abiertos y viñedos.
                ACKER mantiene estabilidad, tracción y precisión de navegación incluso en condiciones adversas o terrenos irregulares.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
              <h3 className="font-bold">♻️ Adaptable</h3>
              <p className="mt-2 text-slate-300">
                Gracias a su diseño modular, ACKER puede personalizarse para cumplir casi cualquier tarea en el campo:
                desde monitoreo visual y análisis de cultivos hasta transporte, fumigación selectiva o mapeo ambiental.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
              <h3 className="font-bold">🤖 Autónomo</h3>
              <p className="mt-2 text-slate-300">
                Equipado con algoritmos de navegación híbrida —planificación A*, visión multi-YOLO y aprendizaje por refuerzo Fuzzy-PPO—,
                ACKER se desplaza y toma decisiones sin supervisión humana, aprendiendo del entorno en tiempo real.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
              <h3 className="font-bold">⚙️ Confiable</h3>
              <p className="mt-2 text-slate-300">
                Probado en simulaciones y entornos agrícolas reales, validando desempeño con métricas de precisión, estabilidad y eficiencia energética.
                Su diseño robusto y software adaptable garantizan operación confiable en las condiciones del campo mexicano y latinoamericano.
              </p>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}
