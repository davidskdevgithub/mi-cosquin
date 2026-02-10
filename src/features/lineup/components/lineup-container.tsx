"use client";

import { useMemo, useRef } from "react";
import { TOTAL_COLUMNS } from "../lineup.config";
import { SCENARIOS, TIME_SLOTS } from "../lineup.data";
import type { Event, EventsType } from "../lineup.types";
import { EventSlotCell } from "./event-slot-cell";
import { EventsGrid } from "./events-grid";
import { ScenarioSidebar } from "./scenario-sidebar";
import { TimeSlotCell } from "./time-slot-cell";

interface LineupContainerProps {
  events: EventsType;
}

export const LineupContainer = ({ events }: LineupContainerProps) => {
  const activeScenarios = useMemo(
    () =>
      SCENARIOS.filter((scenario) => {
        const scenarioEvents = events[scenario.id];
        return scenarioEvents !== undefined && scenarioEvents.length > 0;
      }),
    [events],
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full">
      {/* Columna fija de escenarios */}
      <ScenarioSidebar scenarios={activeScenarios} />

      {/* Área desplazable con la grilla */}
      <div ref={scrollContainerRef} className="grow overflow-x-auto">
        <div className="inline-block min-w-full relative">
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
