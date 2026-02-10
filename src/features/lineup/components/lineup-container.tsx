"use client";

import { useMemo, useRef, useCallback } from "react";
import { TOTAL_COLUMNS, START_TIME, TOTAL_MINUTES } from "../lineup.config";
import { SCENARIOS, TIME_SLOTS } from "../lineup.data";
import { timeToMinutes, getCurrentArgentinaTime } from "../lineup.helpers";
import { useFavorites } from "../lineup.hooks";
import type { Event, EventsType } from "../lineup.types";
import { CurrentTimeIndicator } from "./current-time-indicator";
import { EventSlotCell } from "./event-slot-cell";
import { EventsGrid } from "./events-grid";
import { ScenarioSidebar } from "./scenario-sidebar";
import { TimeSlotCell } from "./time-slot-cell";

interface LineupContainerProps {
  events: EventsType;
}

export const LineupContainer = ({ events }: LineupContainerProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const activeScenarios = useMemo(
    () =>
      SCENARIOS.filter((scenario) => {
        const scenarioEvents = events[scenario.id];
        return scenarioEvents !== undefined && scenarioEvents.length > 0;
      }),
    [events],
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCurrentTime = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const currentTimePosition =
        (container.scrollWidth *
          (timeToMinutes(getCurrentArgentinaTime()) - START_TIME)) /
        TOTAL_MINUTES;
      container.scrollTo({
        left: currentTimePosition - container.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="flex h-full">
      {/* Columna fija de escenarios */}
      <ScenarioSidebar
        scenarios={activeScenarios}
        onTimeClick={scrollToCurrentTime}
      />

      {/* Área desplazable con la grilla */}
      <div ref={scrollContainerRef} className="grow overflow-x-auto">
        <div className="inline-block min-w-full relative">
          {/* Indicador de hora actual */}
          <CurrentTimeIndicator />

          {/* Fila de horarios */}
          <EventsGrid columns={TOTAL_COLUMNS}>
            {TIME_SLOTS.map((slot, index) => (
              <TimeSlotCell key={slot} time={slot} index={index} />
            ))}
          </EventsGrid>

          {/* Filas de eventos por escenario */}
          {activeScenarios.map((scenario) => {
            const scenarioEvents = events[scenario.id];
            if (!scenarioEvents) return null;

            return (
              <EventsGrid key={`grid-${scenario.id}`} columns={TOTAL_COLUMNS}>
                {scenarioEvents.map((event: Event, index: number) => (
                  <EventSlotCell
                    key={`${scenario.id}-${event.banda}`}
                    event={event}
                    nextEvent={scenarioEvents[index + 1]}
                    scenarioId={scenario.id}
                    isFavorite={isFavorite(event.banda)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </EventsGrid>
            );
          })}
        </div>
      </div>
    </div>
  );
};
