"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { START_TIME, TOTAL_MINUTES } from "../lineup.config";
import { getCurrentArgentinaTime, timeToMinutes } from "../lineup.helpers";

interface CurrentTimeIndicatorProps {
  onClick?: () => void;
}

export const CurrentTimeIndicator = ({
  onClick,
}: CurrentTimeIndicatorProps) => {
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
    <div className="absolute top-0 bottom-0" style={{ left: `${position}%` }}>
      {/* Reloj pegado a la línea - sobresale arriba - clickeable */}
      <div className="bg-warning rounded-full p-1 absolute top-0 left-0 -translate-x-1/2 z-20">
        <Clock className="w-4 h-4" />
      </div>
      {/* Línea vertical */}
      <div className="w-0.5 h-full bg-warning z-10" />
    </div>
  );
};
