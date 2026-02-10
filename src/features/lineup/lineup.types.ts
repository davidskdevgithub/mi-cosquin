export type ScenarioId =
  | "sur"
  | "norte"
  | "boomerang"
  | "montana"
  | "paraguay"
  | "hangarclub"
  | "casitablues";

/**
 * Mapeo ScenarioId → clase Tailwind de color del stage.
 * Cada escenario tiene su token --color-stage-<id> definido en ui/index.css.
 */
export const STAGE_COLOR: Record<ScenarioId, string> = {
  sur: "bg-stage-sur",
  norte: "bg-stage-norte",
  boomerang: "bg-stage-boomerang",
  montana: "bg-stage-montana",
  paraguay: "bg-stage-paraguay",
  hangarclub: "bg-stage-hangarclub",
  casitablues: "bg-stage-casitablues",
};

export interface Scenario {
  id: ScenarioId;
  name: string;
  logo: string;
}

export interface Event {
  start: string;
  end: string;
  banda: string;
}

export type EventsType = Partial<Record<ScenarioId, Event[]>>;
