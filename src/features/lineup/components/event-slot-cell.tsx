"use client";

import type { MemberBadge } from "@/features/rooms/active-room.context";
import { Text } from "@/ui";
import { cn } from "@/ui/utils/cn";
import {
  COLUMN_DURATION,
  STAGE_COLOR,
  START_TIME,
  TOTAL_COLUMNS,
} from "../lineup.config";
import { timeToMinutes } from "../lineup.helpers";
import type { Event, ScenarioId } from "../lineup.types";

interface EventSlotCellProps {
  event: Event;
  nextEvent?: Event;
  scenarioId: ScenarioId;
  isFavorite: boolean;
  onToggleFavorite: (banda: string) => void;
  /** Miembros de la sala activa que tienen esta banda como favorita */
  memberFavorites?: MemberBadge[];
}

export const EventSlotCell = ({
  event,
  nextEvent,
  scenarioId,
  isFavorite,
  onToggleFavorite,
  memberFavorites = [],
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
        className={cn(
          "flex flex-col gap-0.5 rounded-base p-2 h-full text-white transition-colors border border-neutral-700",
          isFavorite ? "bg-favorite" : stageColor,
        )}
      >
        <Text variant="label" as="span">
          <span
            className={cn(
              "font-bold truncate",
              isFavorite ? "text-neutral-900" : "text-white",
            )}
          >
            {isFavorite ? `★ ${event.banda}` : event.banda}
          </span>
        </Text>
        <Text variant="caption" as="span">
          <span
            className={cn(
              "flex items-center justify-between",
              isFavorite ? "text-neutral-700" : "text-white/70",
            )}
          >
            <span>{event.start}</span>
            {memberFavorites.length > 0 && (
              <span className="flex items-center gap-0.5 ml-1">
                {memberFavorites.map((member) => (
                  <span
                    key={member.username}
                    className={cn(
                      "inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold leading-none",
                      member.color,
                    )}
                    title={member.username}
                  >
                    {member.initial}
                  </span>
                ))}
              </span>
            )}
          </span>
        </Text>
      </div>
    </button>
  );
};
