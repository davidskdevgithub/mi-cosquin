"use client";

import { useState } from "react";
import { EVENTS_DAY_1, EVENTS_DAY_2 } from "../lineup.data";
import type { DayId, EventsType } from "../lineup.types";
import { DayTabs } from "./day-tabs";
import { LineupContainer } from "./lineup-container";

const EVENTS_BY_DAY: Record<DayId, EventsType> = {
  day1: EVENTS_DAY_1,
  day2: EVENTS_DAY_2,
};

export const LineupPage = () => {
  const [activeDay, setActiveDay] = useState<DayId>("day1");

  return (
    <div className="flex flex-col h-full gap-3">
      <DayTabs activeDay={activeDay} onDayChange={setActiveDay} />
      <LineupContainer events={EVENTS_BY_DAY[activeDay]} />
    </div>
  );
};
