"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cosquin-rock-favorites";

/**
 * Lee favoritos de localStorage.
 * Retorna un Set de nombres de bandas.
 */
const readFavorites = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
};

/**
 * Persiste favoritos en localStorage.
 */
const writeFavorites = (favorites: Set<string>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
};

/**
 * Hook para gestionar favoritos con localStorage.
 * Retorna el set de favoritos y una función toggle.
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Cargar desde localStorage al montar
  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const toggleFavorite = useCallback((banda: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(banda)) {
        next.delete(banda);
      } else {
        next.add(banda);
      }
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (banda: string) => favorites.has(banda),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};
