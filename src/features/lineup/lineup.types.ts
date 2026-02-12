export type DayId = "day1" | "day2";

export type ScenarioId =
  | "sur"
  | "norte"
  | "boomerang"
  | "montana"
  | "paraguay"
  | "hangarclub"
  | "casitablues"
  | "laplaza"
  | "sorpresa";

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
