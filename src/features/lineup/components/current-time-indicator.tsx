"use client";

import { useEffect, useState } from "react";
import { START_TIME, TOTAL_MINUTES } from "../lineup.config";
import { getCurrentArgentinaTime, timeToMinutes } from "../lineup.helpers";

export const CurrentTimeIndicator = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentArgentinaTime());
    };

    updateTime();
    const interval = setInterval(updateTime, 60_000);

    return () => clearInterval(interval);
  }, []);

  if (!currentTime) return null;

  const currentMinutes = timeToMinutes(currentTime) - START_TIME;
  const position = (currentMinutes / TOTAL_MINUTES) * 100;

  // No mostrar si está fuera del rango visible
  if (position < 0 || position > 100) return null;

  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 pointer-events-none"
      style={{ left: `${position}%` }}
    >
      {/* Indicador con la hora actual */}
      <div className="absolute -top-5 -translate-x-1/2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-sm whitespace-nowrap">
        {currentTime}
      </div>
    </div>
  );
};
