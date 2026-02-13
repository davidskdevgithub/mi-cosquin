"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useOnlineStatus } from "@/features/pwa";
import { readCachedHeatmap, writeCachedHeatmap } from "./rooms.helpers";
import type { MemberWithFavorites } from "./rooms.types";

/** Colores asignados a miembros de sala (excluyendo al usuario actual) */
const MEMBER_COLORS = [
  "bg-[var(--color-member-1)] text-white",
  "bg-[var(--color-member-2)] text-white",
  "bg-[var(--color-member-3)] text-white",
  "bg-[var(--color-member-4)] text-neutral-900",
  "bg-[var(--color-member-5)] text-white",
  "bg-[var(--color-member-6)] text-neutral-900",
] as const;

export interface MemberBadge {
  username: string;
  initial: string;
  color: string;
}

interface ActiveRoomContextValue {
  /** ID de la sala activa, o null si no hay ninguna */
  activeRoomId: Id<"rooms"> | null;
  /** Nombre de la sala activa */
  activeRoomName: string | null;
  /** Dado un nombre de banda, retorna los miembros (no-yo) que la tienen como favorita */
  getMemberFavorites: (banda: string) => MemberBadge[];
  /** Activar una sala */
  setActiveRoom: (roomId: Id<"rooms">, roomName: string) => void;
  /** Desactivar la sala */
  clearActiveRoom: () => void;
}

const ActiveRoomContext = createContext<ActiveRoomContextValue | null>(null);

interface ActiveRoomProviderProps {
  activeRoomId: Id<"rooms"> | null;
  activeRoomName: string | null;
  currentUserId: Id<"users"> | null;
  onSetActiveRoom: (roomId: Id<"rooms">, roomName: string) => void;
  onClearActiveRoom: () => void;
  children: ReactNode;
}

export const ActiveRoomProvider = ({
  activeRoomId,
  activeRoomName,
  currentUserId,
  onSetActiveRoom,
  onClearActiveRoom,
  children,
}: ActiveRoomProviderProps) => {
  const isOnline = useOnlineStatus();

  const convexHeatmapData = useQuery(
    api.rooms.getHeatmapData,
    activeRoomId ? { roomId: activeRoomId } : "skip",
  );

  const [cachedHeatmap, setCachedHeatmap] = useState<
    MemberWithFavorites[] | null
  >(null);

  // Cachear heatmap cuando hay conexión y datos nuevos
  useEffect(() => {
    if (activeRoomId && isOnline && convexHeatmapData) {
      writeCachedHeatmap(activeRoomId, convexHeatmapData);
    }
  }, [activeRoomId, isOnline, convexHeatmapData]);

  // Cargar cache al montar o cuando se perde conexión
  useEffect(() => {
    if (activeRoomId && !isOnline) {
      const cached = readCachedHeatmap(activeRoomId);
      if (cached) {
        setCachedHeatmap(cached);
      }
    } else if (isOnline) {
      setCachedHeatmap(null);
    }
  }, [activeRoomId, isOnline]);

  // Usar datos de Convex si está online, sino usar cache
  const heatmapData = isOnline ? convexHeatmapData : cachedHeatmap;

  // Mappeo: miembro → color asignado (excluye al usuario actual)
  const memberColorMap = useMemo(() => {
    if (!heatmapData || !currentUserId) return new Map<string, MemberBadge>();

    const map = new Map<string, MemberBadge>();
    let colorIndex = 0;

    for (const member of heatmapData) {
      if (member.userId === currentUserId) continue; // saltear al yo
      map.set(member.userId, {
        username: member.username,
        initial: member.username.charAt(0).toUpperCase(),
        color: MEMBER_COLORS[colorIndex % MEMBER_COLORS.length],
      });
      colorIndex++;
    }

    return map;
  }, [heatmapData, currentUserId]);

  // Mappeo inverso: banda → MemberBadge[] (excluyendo al yo)
  const bandaToMembers = useMemo(() => {
    if (!heatmapData || !currentUserId) return new Map<string, MemberBadge[]>();

    const map = new Map<string, MemberBadge[]>();

    for (const member of heatmapData) {
      if (member.userId === currentUserId) continue;
      const badge = memberColorMap.get(member.userId);
      if (!badge) continue;

      for (const banda of member.favorites) {
        const existing = map.get(banda) ?? [];
        existing.push(badge);
        map.set(banda, existing);
      }
    }

    return map;
  }, [heatmapData, currentUserId, memberColorMap]);

  const getMemberFavorites = useCallback(
    (banda: string): MemberBadge[] => {
      return bandaToMembers.get(banda) ?? [];
    },
    [bandaToMembers],
  );

  const value = useMemo<ActiveRoomContextValue>(
    () => ({
      activeRoomId,
      activeRoomName,
      getMemberFavorites,
      setActiveRoom: onSetActiveRoom,
      clearActiveRoom: onClearActiveRoom,
    }),
    [
      activeRoomId,
      activeRoomName,
      getMemberFavorites,
      onSetActiveRoom,
      onClearActiveRoom,
    ],
  );

  return (
    <ActiveRoomContext.Provider value={value}>
      {children}
    </ActiveRoomContext.Provider>
  );
};

/**
 * Hook para consumir la sala activa desde cualquier componente.
 * Retorna null values si no hay provider (uso sin salas).
 */
export const useActiveRoom = (): ActiveRoomContextValue => {
  const context = useContext(ActiveRoomContext);
  if (!context) {
    return {
      activeRoomId: null,
      activeRoomName: null,
      getMemberFavorites: () => [],
      setActiveRoom: () => {},
      clearActiveRoom: () => {},
    };
  }
  return context;
};
