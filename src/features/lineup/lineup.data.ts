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
  { id: "boomerang", name: "Boomerang", logo: "" },
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
    { start: "14:30", end: "", banda: "FANTASMAGORÍA" },
    { start: "15:20", end: "", banda: "LA MISSISSIPPI" },
    { start: "16:30", end: "", banda: "EMI" },
    { start: "17:50", end: "", banda: "CRUZANDO EL CHARCO" },
    { start: "19:40", end: "", banda: "CIRO Y LOS PERSAS" },
    { start: "21:40", end: "", banda: "LA VELA PUERCA" },
    { start: "23:20", end: "", banda: "LAS PELOTAS" },
    { start: "00:40", end: "", banda: "VIEJAS LOCAS / JÓVENES PORDIOSEROS" },
  ],
  norte: [
    { start: "14:30", end: "", banda: "KILL FLORA" },
    { start: "15:20", end: "", banda: "ERUCA SATIVA" },
    { start: "16:30", end: "", banda: "EL ZAR" },
    { start: "17:50", end: "", banda: "TURF" },
    { start: "19:30", end: "", banda: "DILLOM" },
    { start: "21:20", end: "", banda: "BABASÓNICOS" },
    { start: "23:20", end: "", banda: "LALI" },
    { start: "00:40", end: "", banda: "CALIGARIS" },
  ],
  montana: [
    { start: "14:15", end: "", banda: "CHECHI DE MARCOS" },
    { start: "15:00", end: "", banda: "RYAN" },
    { start: "15:50", end: "", banda: "BERSUIT VERGARABAT" },
    { start: "17:10", end: "", banda: "MARILINA BERTOLDI" },
    { start: "18:40", end: "", banda: "EL KUELGUE" },
    { start: "20:40", end: "", banda: "CUARTETO DE NOS" },
    { start: "22:40", end: "", banda: "FRANZ FERDINAND" },
    { start: "00:00", end: "", banda: "THE CHEMICAL BROTHERS (DJ SET)" },
    { start: "02:00", end: "", banda: "VICTORIA WHYNOT" },
  ],
  boomerang: [
    { start: "14:10", end: "", banda: "MICROTUL" },
    { start: "14:50", end: "", banda: "1915" },
    { start: "15:40", end: "", banda: "UN MUERTO MÁS" },
    { start: "16:30", end: "", banda: "GIRL ULTRA" },
    { start: "17:20", end: "", banda: "HERMANOS GUTIÉRREZ" },
    { start: "18:20", end: "", banda: "INDIOS" },
    { start: "19:20", end: "", banda: "ESTELARES" },
    { start: "20:40", end: "", banda: "ABEL PINTOS" },
    { start: "21:50", end: "", banda: "LA FRANELA" },
    { start: "23:10", end: "", banda: "COTI" },
    { start: "00:30", end: "", banda: "AMIGO DE ARTISTAS" },
  ],
  casitablues: [
    { start: "14:15", end: "", banda: "GOLO'S BAND" },
    { start: "15:05", end: "", banda: "LOS MENTIDORES" },
    { start: "15:55", end: "", banda: "LAS WITCHES" },
    { start: "16:50", end: "", banda: "LE DRACS" },
    { start: "17:45", end: "", banda: "PERRO SUIZO" },
    { start: "18:40", end: "", banda: "MISTY SOUL CHOIR" },
    { start: "19:35", end: "", banda: "TANGO & ROLL" },
    { start: "20:30", end: "", banda: "WAYRA IGLESIAS" },
    { start: "21:25", end: "", banda: "LOS ESPÍRITUS" },
    { start: "22:30", end: "", banda: "PITI FERNÁNDEZ" },
    { start: "23:35", end: "", banda: "LES DIABOLETTES" },
  ],
  laplaza: [
    { start: "16:00", end: "", banda: "CLAUDIO RICCI" },
    { start: "17:00", end: "", banda: "VALENTIN HUEDO B2B BRUZ" },
    { start: "19:00", end: "", banda: "LEHAR B2B SANTIAGO GARCÍA" },
    { start: "21:00", end: "", banda: "SORÄ" },
    { start: "22:30", end: "", banda: "ARKADYAN" },
  ],
  sorpresa: [
    { start: "15:50", end: "", banda: "FALSED" },
    { start: "18:40", end: "", banda: "SORPRESA" },
    { start: "22:20", end: "", banda: "SORPRESA" },
  ],
};

export const EVENTS_DAY_2: EventsType = {
  sur: [
    { start: "14:20", end: "", banda: "AINDA" },
    { start: "15:10", end: "", banda: "KAPANGA" },
    { start: "16:25", end: "", banda: "PAPPO X JUANSE" },
    { start: "17:45", end: "", banda: "EL PLAN DE LA MARIPOSA" },
    { start: "19:40", end: "", banda: "DIVIDIDOS" },
    { start: "21:30", end: "", banda: "TRUENO" },
    { start: "23:10", end: "", banda: "GUASONES" },
    { start: "00:50", end: "", banda: "LOUTA" },
  ],
  norte: [
    { start: "14:30", end: "", banda: "SOFI MORA" },
    { start: "15:20", end: "", banda: "BLAIR" },
    { start: "16:30", end: "", banda: "GAUCHITO CLUB" },
    { start: "17:50", end: "", banda: "BANDALOS CHINOS" },
    { start: "19:10", end: "", banda: "FITO PAEZ" },
    { start: "20:55", end: "", banda: "AIRBAG" },
    { start: "23:00", end: "", banda: "YSY A" },
    { start: "00:20", end: "", banda: "CARAS EXTRAÑAS" },
  ],
  montana: [
    { start: "14:30", end: "", banda: "RENZO LEALI" },
    { start: "15:00", end: "", banda: "BEATS MODERNOS" },
    { start: "15:50", end: "", banda: "GUSTAVO CORDERA" },
    { start: "17:00", end: "", banda: "LOS PERICOS" },
    { start: "18:30", end: "", banda: "SILVESTRE Y LA NARANJA" },
    { start: "20:20", end: "", banda: "MORAT" },
    { start: "22:20", end: "", banda: "LAS PASTILLAS DEL ABUELO" },
    { start: "00:00", end: "", banda: "PECES RAROS" },
    { start: "01:00", end: "", banda: "MARIANO MELLINO" },
    { start: "02:00", end: "", banda: "FRANKY WAH" },
  ],
  paraguay: [
    { start: "14:20", end: "", banda: "WANDA JAEL" },
    { start: "15:10", end: "", banda: "T&K" },
    { start: "16:10", end: "", banda: "MALANDRO" },
    { start: "17:20", end: "", banda: "GAUCHOS OF THE PAMPA" },
    { start: "18:20", end: "", banda: "DEVENDRA BANHART" },
    { start: "19:30", end: "", banda: "DUM CHICA" },
    { start: "20:30", end: "", banda: "MARKY RAMONE" },
    { start: "21:35", end: "", banda: "DAVID ELLEFSON" },
    { start: "22:35", end: "", banda: "CTM" },
    { start: "23:35", end: "", banda: "SIX SEX" },
    { start: "00:45", end: "", banda: "EL CLUB DE LA SERPIENTE" },
  ],
  casitablues: [
    { start: "14:15", end: "", banda: "ROSY GOMEEZ" },
    { start: "15:05", end: "", banda: "LABIOS DE SAL" },
    { start: "15:55", end: "", banda: "RUDY" },
    { start: "16:50", end: "", banda: "BULLDOZER BLUES BAND" },
    { start: "17:45", end: "", banda: "CORDELIA'S BLUES" },
    { start: "18:40", end: "", banda: "GRASSHOPPER'S" },
    { start: "19:35", end: "", banda: "GISA LONDERO & TOYO BAGOSO" },
    { start: "20:40", end: "", banda: "CRYSTAL THOMAS & LUCA GIORDANO" },
    { start: "21:45", end: "", banda: "NINA PORTELA" },
    { start: "22:40", end: "", banda: "XIME MONZÓN" },
    { start: "23:35", end: "", banda: "LORETTA SORBELLO" },
  ],
  laplaza: [
    { start: "16:00", end: "", banda: "LOURDES LOURDES" },
    { start: "17:00", end: "", banda: "GLAUCO DI MAMBRO" },
    { start: "18:00", end: "", banda: "BRIGADO CREW" },
    { start: "19:30", end: "", banda: "DEER JADE" },
    { start: "21:00", end: "", banda: "FRANKY WAH" },
    { start: "22:30", end: "", banda: "KÖLSCH" },
    { start: "00:00", end: "", banda: "MATIAS TANZMANN" },
  ],
  sorpresa: [
    { start: "15:50", end: "", banda: "GOLDEN FLOYD" },
    { start: "17:10", end: "", banda: "SORPRESA" },
    { start: "22:20", end: "", banda: "AGARRATE CATALINA" },
  ],
};
