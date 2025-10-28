"use client";

import Image from "next/image";

/** 🔧 PERILLAS */
const IMG_W = 1000;        // ancho fijo imagen
const IMG_H = 800;         // alto fijo imagen
const CARD_OFFSET_X = -100; // distancia de la card al borde derecho
const CARD_OFFSET_Y = 124;  // distancia de la card al borde inferior

// Card principal (fundador + rol + cita)
const CARD_TITLE = "Pablo Jaramillo — Fundador y Director General de ACKER Robotics";
const CARD_BODY =
  "“Creo profundamente que la robótica puede marcar una diferencia enorme y positiva en la vida de los agricultores. La tecnología está permitiendo que un número creciente de tareas del campo sean asumidas por robots inteligentes, liberando tiempo y recursos para que las personas se enfoquen en las labores que realmente requieren su experiencia y sensibilidad humana. Los resultados ya lo demuestran: nuestros sistemas están ayudando a reducir costos, optimizar el uso de recursos y aumentar la productividad del cultivo. Y esto es solo el comienzo de lo que veremos en los próximos años, una nueva era donde la inteligencia robótica y la agricultura trabajarán lado a lado por un futuro más sostenible y humano.”";


export default function AboutPage() {
  return (
<main className="min-h-screen text-white">

      {/* Header */}
      <section className="py-10 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🌾 Presentamos a ACKER
          </span>
        </h1>
      </section>

      {/* Imagen fija + card superpuesta (estilo Thorvald) */}
      <section className="relative px-6">
        <div
          className="relative mx-auto"
          style={{ width: IMG_W, height: IMG_H, overflow: "visible" }}
        >
          {/* Imagen */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.45)]">
            <Image
              src="/acker-founder.jpg" // ⬅️ tu imagen
              alt="Pablo Jaramillo"
              fill
              priority
              draggable={false}
              className="object-cover object-center select-none"
            />
          </div>

          {/* Card superpuesta */}
          <div
            className="hidden md:block absolute z-10 max-w-[min(560px,90vw)] rounded-2xl bg-white text-slate-900 shadow-2xl p-6"
            style={{ right: CARD_OFFSET_X, bottom: CARD_OFFSET_Y }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
              {CARD_TITLE}
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">{CARD_BODY}</p>
          </div>
        </div>

        {/* Mobile: card debajo */}
        <div className="md:hidden mt-5">
          <div className="rounded-2xl bg-white text-slate-900 shadow-2xl p-6">
            <h2 className="text-2xl font-extrabold leading-tight">{CARD_TITLE}</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">{CARD_BODY}</p>
          </div>
        </div>

        <div className="h-16" />
      </section>

      {/* ============================================================ */}
      {/* A) Triptych: 3 imágenes (estilo de las fotos que mandaste)  */}
      {/* ============================================================ */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { src: "/about/triptych-1.jpg", alt: "Fotografía 1" },
            { src: "/about/triptych-2.jpg", alt: "Fotografía 2" },
            { src: "/about/triptych-3.jpg", alt: "Fotografía 3" },
          ].map((ph) => (
            <div
              key={ph.src}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
            >
              <Image src={ph.src} alt={ph.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* B) Split: imagen izquierda / texto derecha - Desafíos        */}
      {/* ============================================================ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow ring-1 ring-black/5">
            <Image src="/about/split-desafios.jpg" alt="Solucionando desafíos críticos" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              Solucionando desafíos críticos
            </h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              ACKER nació como una iniciativa de investigación aplicada en el ámbito de la robótica agrícola y la inteligencia artificial, desarrollada en colaboración con grupos académicos de ingeniería y ciencias agropecuarias. El proyecto surgió al identificar la urgente necesidad de introducir sistemas autónomos y accesibles que permitieran enfrentar los principales retos del campo moderno: escasez de mano de obra, sostenibilidad, productividad y seguridad alimentaria.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Hoy, ACKER evoluciona como una empresa con identidad propia, comprometida con desarrollar soluciones autónomas para la agricultura de precisión, integrando visión por computadora, aprendizaje por refuerzo y coordinación multi-robot. Su objetivo es democratizar la automatización agrícola, combinando un diseño mecánico robusto con una autonomía inteligente, adaptable y sostenible que mejora la vida de los productores y protege los ecosistemas rurales.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* C) Split invertido: Alianzas                                  */}
      {/* ============================================================ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              Todo se trata de alianzas
            </h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Desde su origen, ACKER ha tenido la misión de transformar la agricultura en un ecosistema colaborativo e inteligente, donde la tecnología y el conocimiento se unan para generar un impacto real en el campo. Buscamos que la agricultura sea más rentable, sostenible y humana, reduciendo el riesgo para los productores, optimizando los recursos y promoviendo una producción más limpia, eficiente y saludable. Para nosotros, todo se trata de colaboración.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Nuestra visión es construir redes de cooperación entre universidades, agricultores, investigadores y emprendedores, para impulsar el desarrollo de robots agrícolas accesibles, modulares y adaptables. Los sistemas ACKER pueden operar en campos abiertos, invernaderos y túneles de cultivo, realizando tareas repetitivas de monitoreo, navegación y análisis que ayudan a liberar tiempo y mejorar la eficiencia de cada temporada agrícola.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow ring-1 ring-black/5">
            <Image src="/about/split-alianzas.jpg" alt="Alianzas" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 🌎 Universidades Asociadas                                    */}
      {/* ============================================================ */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">Universidades Asociadas</h2>
          <p className="mt-6 text-slate-300 leading-relaxed">
            Aunque nuestro principal objetivo es ofrecer soluciones tecnológicas directamente al sector agrícola, en ACKER reconocemos el enorme valor de la investigación académica y la formación de talento científico. Por ello, colaboramos activamente con universidades, institutos tecnológicos y centros de innovación en el desarrollo de nuevas tecnologías de visión artificial, robótica móvil y agricultura de precisión.
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            El ecosistema ACKER se ha convertido en una plataforma abierta para la investigación, donde estudiantes y docentes pueden probar algoritmos de navegación, segmentación, aprendizaje por refuerzo y fusión sensorial en entornos simulados y reales. Estas alianzas nos permiten acelerar la transferencia tecnológica del laboratorio al campo, impulsando la innovación desde las aulas hasta los sistemas productivos.
          </p>

          {/* Logos (placeholders) */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center opacity-80">
            {["/about/logo-1.svg", "/about/logo-2.svg", "/about/logo-3.svg"].map((logo) => (
              <div key={logo} className="h-14 relative w-32">
                <Image src={logo} alt="Logo universidad asociada" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 👨‍🔬 El Equipo ACKER                                          */}
      {/* ============================================================ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">El Equipo ACKER</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Somos un equipo interdisciplinario de investigadores, ingenieros, diseñadores, programadores y especialistas agrícolas comprometidos con el desarrollo de soluciones inteligentes para el campo. Nuestro trabajo combina robótica, inteligencia artificial y sostenibilidad, con un enfoque centrado en la accesibilidad, la eficiencia y el impacto social.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              El equipo ACKER está conformado por colaboradores en distintas áreas del conocimiento —robótica, electrónica, mecatrónica, ciencias computacionales, agronomía y diseño industrial— que unen esfuerzos para construir una nueva generación de robots agrícolas cooperativos y sostenibles.
            </p>
            <p className="mt-4 text-slate-300 italic">
              ¿Quieres saber más sobre nuestro equipo o colaborar en proyectos conjuntos? Contáctanos y forma parte de la evolución agrícola.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow ring-1 ring-black/5">
            <Image src="/about/team.jpg" alt="Equipo ACKER" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📩 Contáctanos                                                */}
      {/* ============================================================ */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">📩 Contáctanos</h2>
          <p className="mt-6 text-slate-300 leading-relaxed">
            ¿Te gustaría saber más sobre ACKER y cómo puede transformar tu proceso agrícola? Escríbenos y descubre cómo nuestra tecnología puede adaptarse a tu cultivo o proyecto.
          </p>
          <a
            href="mailto:hola@acker.ai"
            className="inline-flex mt-8 px-6 py-3 rounded-2xl bg-white text-slate-900 font-semibold shadow-lg"
          >
            Contáctanos →
          </a>
        </div>
      </section>

      <footer className="px-6 pb-12 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ACKER Robotics
      </footer>
    </main>
  );
}
