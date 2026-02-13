/**
 * Mapeo ScenarioId → clase Tailwind de color del stage.
 * Cada escenario tiene su token --color-stage-<id> definido en ui/index.css.
 */
import type { ScenarioId } from "./lineup.types";

export const STAGE_COLOR: Record<ScenarioId, string> = {
  sur: "bg-stage-sur",
  norte: "bg-stage-norte",
  boomerang: "bg-stage-boomerang",
  montana: "bg-stage-montana",
  paraguay: "bg-stage-paraguay",
  hangarclub: "bg-stage-hangarclub",
  casitablues: "bg-stage-casitablues",
  laplaza: "bg-stage-laplaza",
  sorpresa: "bg-stage-sorpresa",
};

/** Inicio de jornada en minutos (14:00) */
export const START_TIME = 14 * 60;

/** Fin de jornada en minutos (04:00 del día siguiente) */
export const END_TIME = (24 + 4) * 60;

/** Minutos totales de la jornada */
export const TOTAL_MINUTES = END_TIME - START_TIME;

/** Duración de cada columna del grid en minutos */
export const COLUMN_DURATION = 10;

/** Cantidad total de columnas en el grid */
export const TOTAL_COLUMNS = TOTAL_MINUTES / COLUMN_DURATION;

/** Altura de cada fila de escenario */
export const ROW_HEIGHT = "h-18";
