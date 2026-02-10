"use client";

import { Text } from "@/ui";
import { COLUMN_DURATION, START_TIME, TOTAL_COLUMNS } from "../lineup.config";
import { timeToMinutes } from "../lineup.helpers";
import type { Event, ScenarioId } from "../lineup.types";
import { STAGE_COLOR } from "../lineup.types";

interface EventSlotCellProps {
  event: Event;
  nextEvent?: Event;
  scenarioId: ScenarioId;
}

export const EventSlotCell = ({
  event,
  nextEvent,
  scenarioId,
}: EventSlotCellProps) => {
  const stageColor = STAGE_COLOR[scenarioId];
  const startMinutes = timeToMinutes(event.start) - START_TIME;

  const maxDuration = startMinutes + 90;
  let endMinutes: number;

  if (event.end) {
    endMinutes = timeToMinutes(event.end) - START_TIME;
  } else if (nextEvent) {
    const nextEventMinutes = timeToMinutes(nextEvent.start) - START_TIME;
    endMinutes = Math.min(nextEventMinutes, maxDuration);
  } else {
    endMinutes = startMinutes + 90;
  }

  const startColumn = Math.floor(startMinutes / COLUMN_DURATION) + 1;
  const endColumn = Math.floor(endMinutes / COLUMN_DURATION) + 1;

  if (startColumn > TOTAL_COLUMNS) return null;

  return (
    <div
      className="py-1 overflow-hidden"
      style={{
        gridColumn: `${startColumn} / ${endColumn}`,
        gridRow: "1",
      }}
    >
      <div
        className={`flex flex-col gap-0.5 rounded-base ${stageColor} p-2 h-full text-white`}
      >
        <Text variant="label" as="span">
          <span className="text-white font-bold truncate">{event.banda}</span>
        </Text>
        <Text variant="caption" as="span">
          <span className="text-white/70">{event.start}</span>
        </Text>
      </div>
    </div>
  );
};
