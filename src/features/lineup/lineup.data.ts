import type { EventsType, Scenario } from "./lineup.types";

/**
 * Fase 1: datos reducidos — 3 escenarios, ~4 bandas, solo Día 1.
 * En Fase 3 se cargará el JSON completo con todos los escenarios y ambos días.
 */

export const SCENARIOS: Scenario[] = [
  { id: "sur", name: "Sur", logo: "" },
  { id: "norte", name: "Norte", logo: "" },
  { id: "boomerang", name: "Boomerang", logo: "" },
];

export const TIME_SLOTS = [
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

export const EVENTS_DAY_1: EventsType = {
  sur: [
    { start: "14:30", end: "", banda: "RYAN" },
    { start: "15:20", end: "", banda: "JOVENES PORDIOSEROS" },
    { start: "16:30", end: "", banda: "LOS TIPITOS" },
    { start: "17:50", end: "", banda: "GUASONES" },
  ],
  norte: [
    { start: "14:30", end: "", banda: "SANTI CELLI" },
    { start: "15:20", end: "", banda: "KOINO YOKAN" },
    { start: "16:30", end: "", banda: "HILDA CANTA A CHARLY" },
    { start: "17:50", end: "", banda: "EL MATO A UN POLICIA MOTORIZADO" },
  ],
  boomerang: [
    { start: "14:50", end: "", banda: "UMA" },
    { start: "15:40", end: "", banda: "FLORIAN" },
    { start: "16:30", end: "", banda: "VINOCIO" },
    { start: "17:20", end: "", banda: "SIDDHARTHA" },
  ],
};
