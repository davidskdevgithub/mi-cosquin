/**
 * Convierte un string "HH:MM" a minutos desde las 00:00.
 * Las horas < 12 se interpretan como post-medianoche (se suman 24h).
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  const extraDay = hours < 12 ? 24 * 60 : 0;
  return hours * 60 + minutes + extraDay;
};

/**
 * Genera los time slots ("HH:MM") para el rango dado, a intervalos regulares.
 */
export const generateTimeSlots = (
  startMinutes: number,
  endMinutes: number,
  intervalMinutes = 30,
): string[] => {
  const slots: string[] = [];
  for (let m = startMinutes; m < endMinutes; m += intervalMinutes) {
    const normalizedMinutes = m % (24 * 60);
    const hours = Math.floor(normalizedMinutes / 60);
    const mins = normalizedMinutes % 60;
    slots.push(
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`,
    );
  }
  return slots;
};

/**
 * Hora actual en zona horaria Argentina, formato "HH:MM" (24h).
 */
export const getCurrentArgentinaTime = (): string => {
  return new Date().toLocaleTimeString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
