export type CropSlug = "lettuce" | "maize" | "brassicas";

export const cropMeta: Record<
  CropSlug,
  { name: string; summary: string; bullets: string[]; img: string }
> = {
  lettuce: {
    name: "Lechuga",
    summary:
      "ACKER navega entre hileras de forma autónoma, monitoreando el crecimiento y la densidad del follaje. Detecta estrés hídrico o deficiencias nutricionales.",
    img: "/lechuga.png",
    bullets: [
      "Navegación autónoma entre hileras",
      "Monitoreo de crecimiento y densidad de follaje",
      "Detección de estrés hídrico/deficiencias nutricionales",
    ],
  },

  maize: {
    name: "Maíz",
    summary:
      "Visión estereoscópica y aprendizaje por refuerzo difuso para seguir hileras con precisión milimétrica incluso con sombra/maleza. Recolecta datos fenotípicos a escala.",
    img: "/maiz.png",
    bullets: [
      "Seguimiento de hileras robusto (estéreo + RL difuso)",
      "Precisión en condiciones adversas (sombra, maleza, terreno irregular)",
      "Fenotipado a gran escala",
    ],
  },

  brassicas: {
    name: "Col y brásicas",
    summary:
      "Segmentación y estimación de pose por planta para conteo, monitoreo de salud y planificación de cosecha.",
    img: "/col.png",
    bullets: [
      "Identificación por planta",
      "Conteo y monitoreo de salud",
      "Planificación de cosecha",
    ],
  },
};
