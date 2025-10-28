import Image from "next/image";

export default function ModuleCarousel() {
  const modules = [
    { src: "/mod-uvc.jpg", t: "UV-C nocturno" },
    { src: "/mod-spray.jpg", t: "Fumigación selectiva" },
    { src: "/mod-transport.jpg", t: "Transporte" },
    { src: "/mod-scout.jpg", t: "Scouting / Conteos" },
    { src: "/mod-weeding.jpg", t: "Weeding" },
    { src: "/mod-sensors.jpg", t: "Sensores / LiDAR" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 bg-white/[0.03]">
      <h2 className="text-2xl md:text-3xl font-bold">Módulos y herramientas</h2>
      <p className="mt-2 text-slate-300 max-w-2xl">
        Un sistema verdaderamente modular inspirado en plataformas agrícolas líderes.
      </p>
      <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {modules.map((x, i) => (
          <figure
            key={i}
            className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4"
          >
            <Image
              src={x.src}
              alt={x.t}
              width={900}
              height={700}
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-300 border-t border-white/10">
              {x.t}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
