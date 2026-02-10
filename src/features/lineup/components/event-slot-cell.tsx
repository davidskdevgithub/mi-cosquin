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
  isFavorite: boolean;
  onToggleFavorite: (banda: string) => void;
}

export const EventSlotCell = ({
  event,
  nextEvent,
  scenarioId,
  isFavorite,
  onToggleFavorite,
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
    <button
      type="button"
      className="py-1 overflow-hidden cursor-pointer text-left"
      style={{
        gridColumn: `${startColumn} / ${endColumn}`,
        gridRow: "1",
      }}
      onClick={() => onToggleFavorite(event.banda)}
    >
      <div
        className={`flex flex-col gap-0.5 rounded-base p-2 h-full text-white transition-colors ${
          isFavorite ? "bg-favorite" : stageColor
        }`}
      >
        <Text variant="label" as="span">
          <span
            className={`font-bold truncate ${isFavorite ? "text-neutral-900" : "text-white"}`}
          >
            {isFavorite ? `★ ${event.banda}` : event.banda}
          </span>
        </Text>
        <Text variant="caption" as="span">
          <span className={isFavorite ? "text-neutral-700" : "text-white/70"}>
            {event.start}
          </span>
        </Text>
      </div>
    </button>
  );
};
