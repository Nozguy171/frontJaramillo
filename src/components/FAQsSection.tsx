"use client";
import React from "react";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Soy productor agrícola, ¿cómo puedo adquirir un robot ACKER para mi campo?",
    a: (
      <>
        Por el momento, ACKER no se vende como un producto comercial individual.
        Lo ofrecemos mediante un modelo de colaboración y desarrollo conjunto con instituciones, universidades y proyectos productivos.
        Esto permite a los productores acceder a la tecnología sin inversión inicial en infraestructura, y con soporte continuo durante el ciclo agrícola.
      </>
    ),
  },
  {
    q: "Tengo una idea de herramienta o módulo para integrar en ACKER, ¿podemos trabajar juntos?",
    a: (
      <>
        ¡Claro que sí! ACKER es una plataforma modular y abierta, diseñada para adaptarse a nuevas aplicaciones.
        Si tienes una propuesta de sensor, brazo robótico o herramienta de cultivo, podemos co-desarrollarla y validarla en campo a través de nuestro programa de innovación colaborativa.
      </>
    ),
  },
  {
    q: "¿ACKER puede trabajar con diferentes tipos de cultivo?",
    a: (
      <>
        Sí. La plataforma puede configurarse para operar en hortalizas, cereales, legumbres o frutales, adaptando sus cámaras,
        algoritmos y módulos mecánicos según el tipo de cultivo y su geometría de hilera.
      </>
    ),
  },
  {
    q: "¿Qué necesito para adaptar mi parcela al uso de robots agrícolas?",
    a: (
      <>
        Solo se requiere una planificación básica del terreno y el acceso a imágenes o mapas del cultivo. Nuestro sistema utiliza visión artificial y posicionamiento local,
        por lo que no necesita GPS-RTK. Esto lo hace ideal para productores que buscan automatización de bajo costo y alta precisión.
      </>
    ),
  },
  {
    q: "¿ACKER puede realizar tareas específicas como detección de maleza o monitoreo fenotípico?",
    a: (
      <>
        Sí. Mediante modelos de visión multi-YOLO y algoritmos de segmentación, ACKER puede detectar maleza, estrés hídrico,
        deficiencias nutricionales o crecimiento irregular. Los datos se integran en un mapa de estado del cultivo accesible desde el agente central.
      </>
    ),
  },
  {
    q: "¿ACKER puede usarse en proyectos de investigación universitaria?",
    a: (
      <>
        Totalmente. ACKER fue diseñado con una arquitectura abierta y educativa, ideal para laboratorios y centros de investigación en robótica,
        IA, agricultura de precisión o automatización. Ofrecemos soporte para integración de sensores, cámaras, PIOs, y software de control como Webots o ROS2.
      </>
    ),
  },
  {
    q: "¿Puedo ser distribuidor o socio de ACKER en mi región?",
    a: (
      <>
        Sí. Buscamos aliados estratégicos, instituciones, cooperativas y empresas tecnológicas interesadas en promover soluciones de automatización agrícola en sus comunidades.
        Contáctanos y te guiaremos en el proceso de colaboración y transferencia tecnológica.
      </>
    ),
  },
  {
    q: "¿Puedo formar parte del equipo ACKER?",
    a: (
      <>
        ¡Por supuesto! Buscamos constantemente jóvenes talentos, investigadores y técnicos apasionados por la robótica, la inteligencia artificial y la agricultura sostenible.
        Si quieres contribuir con tu experiencia o participar en prácticas académicas, escríbenos a <a className="underline decoration-white/30 hover:decoration-white" href="mailto:info@acker-robotics.com">info@acker-robotics.com</a>.
      </>
    ),
  },

  {
    q: "¿En qué entornos puede operar ACKER?",
    a: (
      <>
        Invernaderos y túneles con salto de hilera automático y captura de datos microclimáticos y visuales; también campo abierto.
      </>
    ),
  },
  {
    q: "¿Cómo navega sin GNSS?",
    a: (
      <>
        Usa planificación A* y navegación por visión (Fuzzy-PPO) para desplazarse con seguridad y precisión incluso sin señal GNSS.
      </>
    ),
  },
  {
    q: "¿Qué beneficios de sostenibilidad ofrece?",
    a: (
      <>
        Cero emisiones durante la operación y reducción drástica del uso de agroquímicos mediante tratamientos y monitoreo de precisión.
      </>
    ),
  },
  {
    q: "¿Puedo usar varios robots?",
    a: (
      <>
        Sí. Puede trabajar en enjambre coordinado por un Agente Central que gestiona rutas, misiones y métricas de desempeño.
      </>
    ),
  },
];

export default function FAQsSection() {
  return (
    <section id="faqs" className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Preguntas Frecuentes
            </span>
          </h2>
          <p className="mt-4 text-slate-300">
            Aquí encontrarás las respuestas a algunas de las preguntas más comunes sobre ACKER y nuestras soluciones en robótica agrícola inteligente.
            Si tienes una duda que no aparece en la lista, contáctanos — nos encantará escucharte y colaborar contigo.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-black/[0.3] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)] open:shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-shadow"
            >
              <summary className="flex items-center justify-between cursor-pointer select-none font-semibold text-white">
                <span className="pr-6">{f.q}</span>
                {/* caret */}
                <svg
                  className="w-5 h-5 shrink-0 transition-transform duration-200 group-open:rotate-180 opacity-70"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.14l3.71-2.91a.75.75 0 1 1 .92 1.18l-4.17 3.27a.75.75 0 0 1-.92 0L5.21 8.41a.75.75 0 0 1 .02-1.2z" />
                </svg>
              </summary>
              <div className="mt-3 text-slate-300 leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="mailto:hola@acker.ai"
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-white text-slate-900 font-semibold shadow-lg"
          >
            ¿Aún con dudas? Escríbenos →
          </a>
        </div>
      </div>
    </section>
  );
}
