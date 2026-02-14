"use client";

import { ClockArrowUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFavorites } from "@/features/favorites";
import { useActiveRoom } from "@/features/rooms/active-room.context";
import { START_TIME, TOTAL_COLUMNS, TOTAL_MINUTES } from "../lineup.config";
import { SCENARIOS, TIME_SLOTS } from "../lineup.data";
import { getCurrentArgentinaTime, timeToMinutes } from "../lineup.helpers";
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
  const { getMemberFavorites } = useActiveRoom();

  const [isAtCurrentTime, setIsAtCurrentTime] = useState(true);
  const [isLineAtRight, setIsLineAtRight] = useState(false);
  const [isWithinRange, setIsWithinRange] = useState(false);

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

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentMinutes =
      timeToMinutes(getCurrentArgentinaTime()) - START_TIME;

    // Verificar si la hora actual está dentro del rango de la grilla
    const withinRange = currentMinutes >= 0 && currentMinutes <= TOTAL_MINUTES;
    setIsWithinRange(withinRange);

    if (!withinRange) {
      setIsAtCurrentTime(false);
      return;
    }

    const position = (currentMinutes / TOTAL_MINUTES) * 100;
    const positionPx = (position / 100) * container.scrollWidth;

    // Posición de la línea relativa al viewport
    const relativePosition = positionPx - container.scrollLeft;
    const viewportRatio = relativePosition / container.clientWidth;

    const isVisible =
      Math.abs(relativePosition - container.clientWidth / 2) <
      container.clientWidth / 2;
    const isAtRight = viewportRatio > 0.7;

    setIsAtCurrentTime(isVisible);
    setIsLineAtRight(isAtRight);
  }, []);

  // Calcular estado inicial al montar
  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Botón flotante: visible cuando NO estamos en la hora actual Y dentro del rango */}
      <button
        type="button"
        onClick={scrollToCurrentTime}
        className={`absolute top-0 z-30 bg-warning rounded-full p-1 w-fit transition-all ${
          !isWithinRange || isAtCurrentTime
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        } ${isLineAtRight ? "right-2" : "left-26"}`}
        title="Ir a la hora actual"
      >
        <ClockArrowUp className="w-4 h-4" />
      </button>

      <div className="flex flex-1 overflow-x-hidden">
        {/* Columna fija de escenarios */}
        <ScenarioSidebar scenarios={activeScenarios} />

        {/* Área desplazable con la grilla */}
        <div
          ref={scrollContainerRef}
          className="grow overflow-x-auto"
          onScroll={handleScroll}
        >
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
                      key={`${scenario.id}-${event.start}`}
                      event={event}
                      nextEvent={scenarioEvents[index + 1]}
                      scenarioId={scenario.id}
                      isFavorite={isFavorite(event.banda)}
                      onToggleFavorite={toggleFavorite}
                      memberFavorites={getMemberFavorites(event.banda)}
                    />
                  ))}
                </EventsGrid>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
