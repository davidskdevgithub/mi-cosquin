"use client";

import type { DayId } from "../lineup.types";

interface DayTabsProps {
  activeDay: DayId;
  onDayChange: (day: DayId) => void;
}

const DAYS: { id: DayId; label: string; fecha: string }[] = [
  { id: "day1", label: "Dia 1", fecha: "Sábado 15" },
  { id: "day2", label: "Dia 2", fecha: "Domingo 16" },
];

export const DayTabs = ({ activeDay, onDayChange }: DayTabsProps) => {
  return (
    <div className="flex gap-4 w-full justify-center">
      {DAYS.map((day) => (
        <button
          key={day.id}
          type="button"
          onClick={() => onDayChange(day.id)}
          className={`flex flex-col gap-0 px-4 py-2 text-sm font-semibold rounded-base transition-colors cursor-pointer ${
            activeDay === day.id
              ? "bg-primary text-white"
              : "bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
          }`}
        >
          <span className="uppercase text-lg">{day.label}</span>
          <span className="text-xs">{day.fecha}</span>
        </button>
      ))}
    </div>
  );
};
