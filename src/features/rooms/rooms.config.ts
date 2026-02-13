/** URL base para generar links de unirse a sala */
export const JOIN_URL_BASE =
  typeof window !== "undefined" ? `${window.location.origin}?sala=` : "";

/** Colores del heatmap por nivel de coincidencia (de frío a caliente) */
export const HEATMAP_COLORS = {
  all: "bg-primary text-white",
  most: "bg-primary/70 text-white",
  some: "bg-primary/40 text-white",
  few: "bg-neutral-700 text-neutral-300",
} as const;
