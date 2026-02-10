/** Inicio de jornada en minutos (14:00) */
export const START_TIME = 14 * 60;

/** Fin de jornada en minutos (19:00 para Fase 1, luego se extiende a 04:00+) */
export const END_TIME = 19 * 60;

/** Minutos totales de la jornada */
export const TOTAL_MINUTES = END_TIME - START_TIME;

/** Duración de cada columna del grid en minutos */
export const COLUMN_DURATION = 10;

/** Cantidad total de columnas en el grid */
export const TOTAL_COLUMNS = TOTAL_MINUTES / COLUMN_DURATION;

/** Altura de cada fila de escenario */
export const ROW_HEIGHT = "h-20";
