"use client";

import type { DayId } from "../lineup.types";

interface DayTabsProps {
  activeDay: DayId;
  onDayChange: (day: DayId) => void;
}

const DAYS: { id: DayId; label: string }[] = [
  { id: "day1", label: "Sábado 15" },
  { id: "day2", label: "Domingo 16" },
];

export const DayTabs = ({ activeDay, onDayChange }: DayTabsProps) => {
  return (
    <div className="flex gap-1">
      {DAYS.map((day) => (
        <button
          key={day.id}
          type="button"
          onClick={() => onDayChange(day.id)}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
            activeDay === day.id
              ? "bg-primary text-white"
              : "bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
          }`}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};
