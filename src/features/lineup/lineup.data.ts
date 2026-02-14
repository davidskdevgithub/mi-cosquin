import { END_TIME, START_TIME } from "./lineup.config";
import { generateTimeSlots } from "./lineup.helpers";
import type { EventsType, Scenario } from "./lineup.types";

/**
 * Fase 3: data completa — Actualizada con imágenes de Día 1 y Día 2.
 */

export const SCENARIOS: Scenario[] = [
  { id: "sur", name: "Sur", logo: "" },
  { id: "norte", name: "Norte", logo: "" },
  { id: "montana", name: "Montaña", logo: "" },
  { id: "boomerang", name: "Boom erang", logo: "" },
  { id: "paraguay", name: "Paraguay", logo: "" },
  { id: "casitablues", name: "La Casita del Blues", logo: "" },
  { id: "laplaza", name: "La Plaza Electronic", logo: "" },
  { id: "sorpresa", name: "Sorpresa", logo: "" },
  { id: "hangarclub", name: "Hangar C", logo: "" },
];

/** Time slots generados dinámicamente según el rango de la config */
export const TIME_SLOTS = generateTimeSlots(START_TIME, END_TIME);

export const EVENTS_DAY_1: EventsType = {
  sur: [
    { start: "14:30", end: "15:10", banda: "FANTASMAGORÍA" },
    { start: "15:20", end: "16:00", banda: "LA MISSISSIPPI" },
    { start: "16:30", end: "17:10", banda: "EMI" },
    { start: "17:50", end: "18:40", banda: "CRUZANDO EL CHARCO" },
    { start: "19:40", end: "20:40", banda: "CIRO Y LOS PERSAS" },
    { start: "21:40", end: "22:40", banda: "LA VELA PUERCA" },
    { start: "23:20", end: "00:20", banda: "LAS PELOTAS" },
    {
      start: "00:40",
      end: "02:00",
      banda: "VIEJAS LOCAS / JÓVENES PORDIOSEROS",
    },
  ],
  norte: [
    { start: "14:30", end: "15:10", banda: "KILL FLORA" },
    { start: "15:20", end: "16:00", banda: "ERUCA SATIVA" },
    { start: "16:30", end: "17:10", banda: "EL ZAR" },
    { start: "17:50", end: "18:40", banda: "TURF" },
    { start: "19:30", end: "20:30", banda: "DILLOM" },
    { start: "21:20", end: "22:20", banda: "BABASÓNICOS" },
    { start: "23:20", end: "00:20", banda: "LALI" },
    { start: "00:40", end: "01:40", banda: "CALIGARIS" },
  ],
  montana: [
    { start: "14:15", end: "14:50", banda: "CHECHI DE MARCOS" },
    { start: "15:00", end: "15:40", banda: "RYAN" },
    { start: "15:50", end: "16:30", banda: "BERSUIT VERGARABAT" },
    { start: "17:10", end: "18:00", banda: "MARILINA BERTOLDI" },
    { start: "18:40", end: "19:40", banda: "EL KUELGUE" },
    { start: "20:40", end: "21:40", banda: "CUARTETO DE NOS" },
    { start: "22:40", end: "23:40", banda: "FRANZ FERDINAND" },
    { start: "00:00", end: "01:00", banda: "THE CHEMICAL BROTHERS (DJ SET)" },
    { start: "02:00", end: "03:00", banda: "VICTORIA WHYNOT" },
  ],
  boomerang: [
    { start: "14:10", end: "14:40", banda: "MICROTUL" },
    { start: "14:50", end: "15:30", banda: "1915" },
    { start: "15:40", end: "16:20", banda: "UN MUERTO MÁS" },
    { start: "16:30", end: "17:10", banda: "GIRL ULTRA" },
    { start: "17:20", end: "18:00", banda: "HERMANOS GUTIÉRREZ" },
    { start: "18:20", end: "19:00", banda: "INDIOS" },
    { start: "19:20", end: "20:20", banda: "ESTELARES" },
    { start: "20:40", end: "21:40", banda: "ABEL PINTOS" },
    { start: "21:50", end: "22:50", banda: "LA FRANELA" },
    { start: "23:10", end: "00:00", banda: "COTI" },
    { start: "00:30", end: "01:20", banda: "AMIGO DE ARTISTAS" },
  ],
  casitablues: [
    { start: "14:15", end: "14:45", banda: "GOLO'S BAND" },
    { start: "15:05", end: "15:35", banda: "LOS MENTIDORES" },
    { start: "15:55", end: "16:25", banda: "LAS WITCHES" },
    { start: "16:50", end: "17:20", banda: "LE DRACS" },
    { start: "17:45", end: "18:15", banda: "PERRO SUIZO" },
    { start: "18:40", end: "19:10", banda: "MISTY SOUL CHOIR" },
    { start: "19:35", end: "20:15", banda: "TANGO & ROLL" },
    { start: "20:30", end: "21:10", banda: "WAYRA IGLESIAS" },
    { start: "21:25", end: "22:05", banda: "LOS ESPÍRITUS" },
    { start: "22:30", end: "23:15", banda: "PITI FERNÁNDEZ" },
    { start: "23:35", end: "00:15", banda: "LES DIABOLETTES" },
  ],
  laplaza: [
    { start: "16:00", end: "16:40", banda: "CLAUDIO RICCI" },
    { start: "17:00", end: "17:40", banda: "VALENTIN HUEDO B2B BRUZ" },
    { start: "19:00", end: "20:00", banda: "LEHAR B2B SANTIAGO GARCÍA" },
    { start: "21:00", end: "22:00", banda: "SORÄ" },
    { start: "22:30", end: "23:30", banda: "ARKADYAN" },
  ],
  sorpresa: [
    { start: "15:50", end: "16:30", banda: "FALSED" },
    { start: "18:40", end: "19:20", banda: "SORPRESA" },
    { start: "22:20", end: "23:00", banda: "SORPRESA" },
  ],
};

export const EVENTS_DAY_2: EventsType = {
  sur: [
    { start: "14:20", end: "15:00", banda: "AINDA" },
    { start: "15:10", end: "15:50", banda: "KAPANGA" },
    { start: "16:25", end: "17:05", banda: "PAPPO X JUANSE" },
    { start: "17:45", end: "18:45", banda: "EL PLAN DE LA MARIPOSA" },
    { start: "19:40", end: "20:40", banda: "DIVIDIDOS" },
    { start: "21:30", end: "22:30", banda: "TRUENO" },
    { start: "23:10", end: "00:10", banda: "GUASONES" },
    { start: "00:50", end: "01:50", banda: "LOUTA" },
  ],
  norte: [
    { start: "14:30", end: "15:10", banda: "SOFI MORA" },
    { start: "15:20", end: "16:00", banda: "BLAIR" },
    { start: "16:30", end: "17:10", banda: "GAUCHITO CLUB" },
    { start: "17:50", end: "18:40", banda: "BANDALOS CHINOS" },
    { start: "19:10", end: "20:20", banda: "FITO PAEZ" },
    { start: "20:55", end: "21:55", banda: "AIRBAG" },
    { start: "23:00", end: "00:00", banda: "YSY A" },
    { start: "00:20", end: "01:20", banda: "CARAS EXTRAÑAS" },
  ],
  montana: [
    { start: "14:30", end: "14:55", banda: "RENZO LEALI" },
    { start: "15:00", end: "15:40", banda: "BEATS MODERNOS" },
    { start: "15:50", end: "16:30", banda: "GUSTAVO CORDERA" },
    { start: "17:00", end: "18:00", banda: "LOS PERICOS" },
    { start: "18:30", end: "19:20", banda: "SILVESTRE Y LA NARANJA" },
    { start: "20:20", end: "21:20", banda: "MORAT" },
    { start: "22:20", end: "23:20", banda: "LAS PASTILLAS DEL ABUELO" },
    { start: "00:00", end: "00:50", banda: "PECES RAROS" },
    { start: "01:00", end: "01:50", banda: "MARIANO MELLINO" },
    { start: "02:00", end: "03:00", banda: "FRANKY WAH" },
  ],
  paraguay: [
    { start: "14:20", end: "15:00", banda: "WANDA JAEL" },
    { start: "15:10", end: "16:00", banda: "T&K" },
    { start: "16:10", end: "17:00", banda: "MALANDRO" },
    { start: "17:20", end: "18:00", banda: "GAUCHOS OF THE PAMPA" },
    { start: "18:20", end: "19:10", banda: "DEVENDRA BANHART" },
    { start: "19:30", end: "20:20", banda: "DUM CHICA" },
    { start: "20:30", end: "21:20", banda: "MARKY RAMONE" },
    { start: "21:35", end: "22:25", banda: "DAVID ELLEFSON" },
    { start: "22:35", end: "23:25", banda: "CTM" },
    { start: "23:35", end: "00:35", banda: "SIX SEX" },
    { start: "00:45", end: "01:45", banda: "EL CLUB DE LA SERPIENTE" },
  ],
  casitablues: [
    { start: "14:15", end: "14:55", banda: "ROSY GOMEEZ" },
    { start: "15:05", end: "15:45", banda: "LABIOS DE SAL" },
    { start: "15:55", end: "16:35", banda: "RUDY" },
    { start: "16:50", end: "17:30", banda: "BULLDOZER BLUES BAND" },
    { start: "17:45", end: "18:25", banda: "CORDELIA'S BLUES" },
    { start: "18:40", end: "19:20", banda: "GRASSHOPPER'S" },
    { start: "19:35", end: "20:25", banda: "GISA LONDERO & TOYO BAGOSO" },
    { start: "20:40", end: "21:30", banda: "CRYSTAL THOMAS & LUCA GIORDANO" },
    { start: "21:45", end: "22:25", banda: "NINA PORTELA" },
    { start: "22:40", end: "23:20", banda: "XIME MONZÓN" },
    { start: "23:35", end: "00:15", banda: "LORETTA SORBELLO" },
  ],
  laplaza: [
    { start: "16:00", end: "16:40", banda: "LOURDES LOURDES" },
    { start: "17:00", end: "17:40", banda: "GLAUCO DI MAMBRO" },
    { start: "18:00", end: "18:40", banda: "BRIGADO CREW" },
    { start: "19:30", end: "20:10", banda: "DEER JADE" },
    { start: "21:00", end: "21:40", banda: "FRANKY WAH" },
    { start: "22:30", end: "23:10", banda: "KÖLSCH" },
    { start: "00:00", end: "00:40", banda: "MATIAS TANZMANN" },
  ],
  sorpresa: [
    { start: "15:50", end: "16:30", banda: "GOLDEN FLOYD" },
    { start: "17:10", end: "17:50", banda: "SORPRESA" },
    { start: "22:20", end: "23:00", banda: "AGARRATE CATALINA" },
  ],
};
