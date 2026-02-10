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
