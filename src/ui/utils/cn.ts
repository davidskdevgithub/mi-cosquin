/**
 * Utility for conditionally joining & deduplicating Tailwind class names.
 * clsx handles conditional logic, tailwind-merge resolves conflicts
 * (e.g. bg-primary + className="bg-red-500" → bg-red-500 wins).
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
