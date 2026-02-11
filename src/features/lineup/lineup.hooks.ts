"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useOnlineStatus } from "@/features/pwa";

const STORAGE_KEY = "cosquin-rock-favorites";
const DIRTY_KEY = "cosquin-rock-favorites-dirty";
const FAVORITES_EVENT = "cosquin-rock-favorites-change";

/**
 * Lee favoritos de localStorage.
 * Retorna un Set de nombres de bandas.
 */
const readLocalFavorites = (): Set<string> => {
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
const writeLocalFavorites = (favorites: Set<string>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }
};

const markFavoritesDirty = () => {
  localStorage.setItem(DIRTY_KEY, "1");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }
};

const clearFavoritesDirty = () => {
  localStorage.removeItem(DIRTY_KEY);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }
};

const hasDirtyFavorites = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DIRTY_KEY) === "1";
};

/**
 * Retorna los favoritos locales como array (útil para sincronización).
 */
export const getLocalFavoritesArray = (): string[] => {
  return [...readLocalFavorites()];
};

const getLocalFavoritesSnapshot = () => {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) ?? "[]";
};

const subscribeToFavorites = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(FAVORITES_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FAVORITES_EVENT, callback);
  };
};

export const useFavoritesSyncStatus = (userId?: Id<"users"> | null) => {
  const isOnline = useOnlineStatus();
  const convexFavorites = useQuery(
    api.favorites.getByUser,
    userId ? { userId } : "skip",
  );

  const localSnapshot = useSyncExternalStore(
    subscribeToFavorites,
    getLocalFavoritesSnapshot,
    () => "[]",
  );

  const localSet = useMemo(() => {
    try {
      const parsed = JSON.parse(localSnapshot) as string[];
      return new Set(parsed);
    } catch {
      return new Set<string>();
    }
  }, [localSnapshot]);

  const convexSet = useMemo(
    () => (convexFavorites ? new Set(convexFavorites) : null),
    [convexFavorites],
  );

  const localAdds = useMemo(() => {
    if (!convexSet) return [] as string[];
    return [...localSet].filter((b) => !convexSet.has(b));
  }, [localSet, convexSet]);

  const localRemoves = useMemo(() => {
    if (!convexSet) return [] as string[];
    return [...convexSet].filter((b) => !localSet.has(b));
  }, [localSet, convexSet]);

  const hasLocal = localSet.size > 0;
  const hasDiff = localAdds.length > 0 || localRemoves.length > 0;
  const pendingCount = localAdds.length + localRemoves.length;

  const isSyncing = Boolean(
    userId &&
      isOnline &&
      convexFavorites &&
      (hasDirtyFavorites() || (hasLocal && hasDiff)),
  );

  return { isSyncing, pendingCount };
};

/**
 * Hook para gestionar favoritos.
 *
 * - Anónimo: usa solo localStorage
 * - Registrado (userId): lee de Convex (real-time), escribe a Convex + localStorage
 * - Offline: opera sobre localStorage; al reconectar, mergea diferencias a Convex
 */
export const useFavorites = (userId?: Id<"users"> | null) => {
  const [localFavorites, setLocalFavorites] = useState<Set<string>>(new Set());
  const isOnline = useOnlineStatus();

  // Cargar desde localStorage al montar
  useEffect(() => {
    setLocalFavorites(readLocalFavorites());
  }, []);

  // Convex: leer favoritos del usuario registrado
  const convexFavorites = useQuery(
    api.favorites.getByUser,
    userId ? { userId } : "skip",
  );

  const toggleMutation = useMutation(api.favorites.toggle);

  // Track: evita sobrescribir cambios locales mientras se reconcilia con Convex
  const isMergingRef = useRef(false);

  // Cuando Convex entrega datos (reconexión), mergear cambios locales
  useEffect(() => {
    if (!userId || !convexFavorites || !isOnline) return;

    const local = readLocalFavorites();
    const convexSet = new Set(convexFavorites);

    if (local.size === 0 && !hasDirtyFavorites() && convexSet.size > 0) {
      writeLocalFavorites(convexSet);
      setLocalFavorites(convexSet);
      return;
    }

    if (isMergingRef.current) return;

    const localAdds = [...local].filter((b) => !convexSet.has(b));
    const localRemoves = [...convexSet].filter((b) => !local.has(b));

    if (localAdds.length === 0 && localRemoves.length === 0) {
      clearFavoritesDirty();
      return;
    }

    isMergingRef.current = true;
    for (const banda of localAdds) {
      toggleMutation({ userId, banda });
    }
    for (const banda of localRemoves) {
      toggleMutation({ userId, banda });
    }
  }, [userId, convexFavorites, isOnline, toggleMutation]);

  // Fuente de verdad: Convex si hay userId y datos disponibles, sino localStorage
  const favorites = useMemo(() => localFavorites, [localFavorites]);

  // Siempre mantener localStorage sincronizado con la fuente de verdad
  useEffect(() => {
    if (!userId || !convexFavorites) return;

    const convexSet = new Set(convexFavorites);
    const local = readLocalFavorites();
    const hasDiff =
      local.size !== convexSet.size ||
      [...local].some((b) => !convexSet.has(b));

    if (hasDiff) return;

    if (isMergingRef.current) {
      isMergingRef.current = false;
    }

    clearFavoritesDirty();
  }, [userId, convexFavorites]);

  const toggleFavorite = useCallback(
    (banda: string) => {
      // Siempre actualizar localStorage (fallback offline)
      setLocalFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(banda)) {
          next.delete(banda);
        } else {
          next.add(banda);
        }
        writeLocalFavorites(next);
        if (!isOnline) {
          markFavoritesDirty();
        }
        return next;
      });

      // Si hay userId, también hacer toggle en Convex (falla silenciosamente offline)
      if (userId) {
        toggleMutation({ userId, banda });
      }
    },
    [userId, toggleMutation, isOnline],
  );

  const isFavorite = useCallback(
    (banda: string) => favorites.has(banda),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};
