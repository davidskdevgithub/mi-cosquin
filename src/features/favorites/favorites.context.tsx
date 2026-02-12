"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useOnlineStatus } from "@/features/pwa";
import { readLocalFavorites, writeLocalFavorites } from "./favorites.helpers";
import type { FavoritesContextValue } from "./favorites.types";

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  userId?: Id<"users"> | null;
  children: ReactNode;
}

export const FavoritesProvider = ({
  userId,
  children,
}: FavoritesProviderProps) => {
  // Un solo useState: fuente de verdad en el render tree
  // Inicializar vacío para evitar hydration mismatch (server no tiene localStorage)
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  const isOnline = useOnlineStatus();

  // --- Convex ---
  const convexFavorites = useQuery(
    api.favorites.getByUser,
    userId ? { userId } : "skip",
  );
  const toggleMutation = useMutation(api.favorites.toggle);
  const isMergingRef = useRef(false);

  // --- Hidratar desde localStorage después del mount ---
  const isHydrated = useRef(false);
  useEffect(() => {
    const stored = readLocalFavorites();
    if (stored.size > 0) {
      setFavorites(stored);
    }
    isHydrated.current = true;
  }, []);

  // --- Persistir a localStorage como side effect ---
  useEffect(() => {
    // No escribir hasta que hayamos hidratado desde localStorage
    if (!isHydrated.current) return;
    writeLocalFavorites(favorites);
  }, [favorites]);

  // --- Sync: reconciliar con Convex al conectar/reconectar ---
  useEffect(() => {
    if (!userId || !convexFavorites || !isOnline) return;

    const convexSet = new Set(convexFavorites);

    // Caso: usuario nuevo, local vacío, Convex tiene datos → descargar
    if (favorites.size === 0 && convexSet.size > 0) {
      setFavorites(convexSet);
      return;
    }

    if (isMergingRef.current) return;

    // Calcular diff: qué tiene local que Convex no, y viceversa
    const localAdds = [...favorites].filter((b) => !convexSet.has(b));
    const localRemoves = [...convexSet].filter((b) => !favorites.has(b));

    if (localAdds.length === 0 && localRemoves.length === 0) return;

    // Subir diferencias a Convex
    isMergingRef.current = true;

    const mutations = [...localAdds, ...localRemoves].map((banda) =>
      toggleMutation({ userId, banda }).catch((err) => {
        console.warn("[Favorites] Error syncing banda:", banda, err);
      }),
    );

    Promise.all(mutations).catch(() => {
      // Si todo falla, resetear para reintentar en el próximo ciclo
      isMergingRef.current = false;
    });
  }, [userId, convexFavorites, isOnline, favorites, toggleMutation]);

  // --- Resetear merge flag cuando Convex confirma sync ---
  useEffect(() => {
    if (!userId || !convexFavorites || !isMergingRef.current) return;

    const convexSet = new Set(convexFavorites);
    const synced =
      favorites.size === convexSet.size &&
      [...favorites].every((b) => convexSet.has(b));

    if (synced) {
      isMergingRef.current = false;
    }
  }, [userId, convexFavorites, favorites]);

  // --- Sync status derivado del estado actual ---
  const syncInfo = useMemo(() => {
    if (!userId || !isOnline || !convexFavorites) {
      return { isSyncing: false, pendingCount: 0 };
    }
    const convexSet = new Set(convexFavorites);
    const adds = [...favorites].filter((b) => !convexSet.has(b));
    const removes = [...convexSet].filter((b) => !favorites.has(b));
    const pendingCount = adds.length + removes.length;
    return { isSyncing: pendingCount > 0, pendingCount };
  }, [userId, isOnline, convexFavorites, favorites]);

  // --- Toggle ---
  const toggleFavorite = useCallback(
    (banda: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(banda)) {
          next.delete(banda);
        } else {
          next.add(banda);
        }
        return next;
      });

      // Enviar a Convex si hay usuario
      if (userId) {
        toggleMutation({ userId, banda }).catch((err) => {
          console.warn("[Favorites] Toggle failed for:", banda, err);
        });
      }
    },
    [userId, toggleMutation],
  );

  const isFavorite = useCallback(
    (banda: string) => favorites.has(banda),
    [favorites],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      ...syncInfo,
    }),
    [favorites, toggleFavorite, isFavorite, syncInfo],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Hook para consumir favoritos desde cualquier componente del árbol.
 */
export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites debe usarse dentro de un <FavoritesProvider>",
    );
  }
  return context;
};
