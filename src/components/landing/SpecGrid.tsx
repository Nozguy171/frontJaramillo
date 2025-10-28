export default function SpecGrid() {
  const specs = [
    { v: "640", l: "imgsz máx" },
    { v: "0.25", l: "conf (default)" },
    { v: "≤ 60s", l: "video" },
    { v: "24/7", l: "operación" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {specs.map((s) => (
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
