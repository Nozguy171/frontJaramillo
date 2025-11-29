import { cropMeta, type CropSlug } from "@/lib/crops";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function CropPage({ params }: { params: { slug: CropSlug } }) {
  const data = cropMeta[params.slug];
  if (!data) return notFound();

  return (
    <div>
      <section className="px-6 pt-10 pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end gap-3">
            <Link href="/crops" className="badge">← Cultivos</Link>
            <p className="text-slate-300 text-sm">Perfil del cultivo</p>
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">{data.name}</h1>
          <p className="mt-4 text-slate-300 max-w-3xl">{data.summary}</p>

<div className="mt-6 card overflow-hidden">
  <div className="aspect-[16/7] relative">
    <img
      src={data.img}
      alt={data.name}
      className="w-full h-full object-cover"
    />
  </div>
</div>

        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-4">
            {data.bullets.map((b, i) => (
              <div key={i} className="card p-5">
                <p className="text-slate-200 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>

          <aside className="md:col-span-2 space-y-4">
            <div className="card p-5">
              <h3 className="text-lg font-semibold">Cómo contribuye ACKER</h3>
              <p className="mt-2 text-sm text-slate-300">
                Navegación autónoma entre hileras, análisis visual de plantas con multi-YOLO
                y generación de mapas/indicadores del cultivo para decisiones oportunas.
              </p>
            </div>
            <div className="card p-5">
              <h4 className="font-semibold">Compatibilidad</h4>
              <p className="mt-1 text-sm text-slate-300">
                Invernaderos, túneles y campo abierto. Integración con módulos ópticos,
                cámaras estéreo y sensores ambientales.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
