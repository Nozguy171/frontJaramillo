import Image from "next/image";

export default function UseCaseCards() {
  const cases = [
    {
      title: "Sostenible",
      desc: "Operación sin CO₂ y reducción de químicos.",
      img: "/vp-sustain.jpg",
    },
    {
      title: "Costo-efectivo",
      desc: "Menor dependencia de mano de obra intensiva.",
      img: "/vp-cost.jpg",
    },
    {
      title: "Modular",
      desc: "Herramientas intercambiables y adaptables.",
      img: "/vp-modular.jpg",
    },
    {
      title: "Autónomo",
      desc: "Navegación inteligente y segura sin supervisión.",
      img: "/vp-auto.jpg",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.07] transition"
          >
            <div className="aspect-[4/3] border-b border-white/10">
              <Image
                src={c.img}
                alt={c.title}
                width={640}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
