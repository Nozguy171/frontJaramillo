"use client";

import { useState } from "react";
import HeroRover, { Hotspot } from "@/components/landing/HeroRover";

type Key = "base" | "small";

const SMALL_HOTSPOTS: Hotspot[] = [
  { id: "mini-top", x: 60, y: 22, title: "Arco compacto", body: "Carcasa reducida para túneles estrechos." },
  { id: "mini-motor", x: 70, y: 40, title: "Motorización ligera", body: "Par optimizado para baja carga." },
  { id: "mini-elect", x: 38, y: 50, title: "Electrónica micro", body: "Módulo sellado IP65 de bajo consumo." },
  { id: "mini-wheel", x: 26, y: 82, title: "Rueda angosta", body: "Mejor maniobra en pasillos cortos." },
];

export default function RoverVariantsTabs() {
  const [tab, setTab] = useState<Key>("base");

  const tabs = [
    { key: "base" as const, label: "Base" },
    { key: "small" as const, label: "Pequeña escala" },
  ];

  return (
    <section id="environments" className="mx-auto max-w-7xl px-6 pt-8 pb-2">
      <div className="relative">
        <div className="hidden lg:flex absolute z-30 top-2 left-1/2 right-0 justify-center">
          <div className="inline-flex items-center gap-6 rounded-xl bg-black/30 backdrop-blur-md px-4 py-2 border border-white/10">
            {tabs.map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative pb-1.5 text-sm transition ${
                    active ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {t.label}
                  <span
                    className={`absolute left-0 -bottom-[2px] h-[2px] w-full rounded bg-emerald-400 transition ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-6 border-b border-white/10 pb-3">
          {tabs.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative pb-2 text-sm transition ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {t.label}
                <span
                  className={`absolute left-0 -bottom-[1px] h-[2px] w-full rounded bg-emerald-400 transition ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {tab === "base" ? (
          <HeroRover
            title={
              <>
                ACKER{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Base
                </span>
              </>
            }
            subtitleBadges={["Base", "Modular", "Autónomo"]}
            imageSrc="/base.png"
            imageAlt="ACKER Base"
          />
        ) : (
          <HeroRover
            title={
              <>
                ACKER{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Pequeña escala
                </span>
              </>
            }
            subtitleBadges={["Pequeña escala", "Túneles estrechos", "Ligero"]}
            imageSrc="/pequeño.png"
            imageAlt="ACKER Pequeña escala"
            hotspots={SMALL_HOTSPOTS}
          />
        )}
      </div>
    </section>
  );
}
