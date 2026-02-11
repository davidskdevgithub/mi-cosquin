import { FAVORITES_STORAGE_KEY } from "./favorites.types";

/**
 * Lee favoritos de localStorage.
 */
export const readLocalFavorites = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
};

/**
 * Persiste favoritos en localStorage.
 */
export const writeLocalFavorites = (favorites: Set<string>) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
};

/**
 * Retorna los favoritos locales como array (útil para registro).
 */
export const getLocalFavoritesArray = (): string[] => {
  return [...readLocalFavorites()];
};
