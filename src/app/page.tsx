"use client";

import type { Id } from "@convex/_generated/dataModel";
import { useCallback, useEffect, useState } from "react";
import { RegisterForm, UserBadge, useIdentity } from "@/features/auth";
import {
  FavoritesProvider,
  getLocalFavoritesArray,
  useFavorites,
} from "@/features/favorites";
import { LineupPage } from "@/features/lineup";
import { OfflineBadge, useOnlineStatus } from "@/features/pwa";
import {
  ActiveRoomProvider,
  RoomsPanel,
  useActiveRoom,
} from "@/features/rooms";
import { Badge } from "@/ui";

interface HeaderProps {
  showRooms: boolean;
  onToggleRooms: () => void;
}

function Header({ showRooms, onToggleRooms }: HeaderProps) {
  const { identity, register } = useIdentity();
  const isOnline = useOnlineStatus();
  const { isSyncing, pendingCount } = useFavorites();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = useCallback(
    async (username: string) => {
      setIsRegistering(true);
      try {
        await register(username, getLocalFavoritesArray());
      } finally {
        setIsRegistering(false);
      }
    },
    [register],
  );

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
      <h1 className="text-xl font-bold text-primary">Cosquin Rock 2026</h1>
      <div className="flex items-center gap-2">
        {isSyncing && (
          <Badge variant="warning" size="sm">
            Sync {pendingCount > 0 ? pendingCount : ""}
          </Badge>
        )}
        <OfflineBadge />
        {identity && (
          <button
            type="button"
            onClick={onToggleRooms}
            className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              showRooms
                ? "bg-primary text-white"
                : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
            }`}
            title="Salas de amigos"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Salas
          </button>
        )}
        {identity ? (
          <UserBadge username={identity.username} />
        ) : isOnline ? (
          <RegisterForm
            onRegister={handleRegister}
            isRegistering={isRegistering}
          />
        ) : (
          <span
            className="px-2 py-1 text-xs font-semibold text-neutral-900 bg-favorite/90 rounded-md"
            title="El registro requiere conexion"
          >
            Registro solo online
          </span>
        )}
      </div>
    </header>
  );
}

/** Banner que indica qué sala está activa en la grilla */
function ActiveRoomBanner() {
  const { activeRoomId, activeRoomName, clearActiveRoom } = useActiveRoom();

  if (!activeRoomId || !activeRoomName) return null;

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-base">
      <span className="text-xs text-primary font-medium">
        Viendo favoritos de: <strong>{activeRoomName}</strong>
      </span>
      <button
        type="button"
        onClick={clearActiveRoom}
        className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}

export default function Home() {
  const { identity } = useIdentity();
  const [showRooms, setShowRooms] = useState(false);
  const [joinCode, setJoinCode] = useState<string | undefined>();
  const [activeRoomId, setActiveRoomId] = useState<Id<"rooms"> | null>(null);
  const [activeRoomName, setActiveRoomName] = useState<string | null>(null);

  const handleSetActiveRoom = useCallback(
    (roomId: Id<"rooms">, roomName: string) => {
      setActiveRoomId(roomId);
      setActiveRoomName(roomName);
    },
    [],
  );

  const handleClearActiveRoom = useCallback(() => {
    setActiveRoomId(null);
    setActiveRoomName(null);
  }, []);

  // Leer ?sala= de la URL para deep-link de unión a sala
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const salaCode = params.get("sala");
    if (salaCode) {
      setJoinCode(salaCode.toUpperCase());
      setShowRooms(true);
      // Limpiar el param de la URL
      const url = new URL(window.location.href);
      url.searchParams.delete("sala");
      window.history.replaceState({}, "", url.pathname);
    }
  }, []);

  return (
    <FavoritesProvider userId={identity?.userId}>
      <ActiveRoomProvider
        activeRoomId={activeRoomId}
        activeRoomName={activeRoomName}
        currentUserId={identity?.userId ?? null}
        onSetActiveRoom={handleSetActiveRoom}
        onClearActiveRoom={handleClearActiveRoom}
      >
        <div className="min-h-screen bg-neutral-900 text-neutral-100">
          <Header
            showRooms={showRooms}
            onToggleRooms={() => setShowRooms((prev) => !prev)}
          />
          <main className="p-2 flex flex-col gap-2">
            {/* Panel de salas colapsable */}
            {showRooms && identity && (
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-base p-4">
                <RoomsPanel
                  userId={identity.userId}
                  initialJoinCode={joinCode}
                />
              </div>
            )}
            <ActiveRoomBanner />
            <LineupPage />
          </main>
        </div>
      </ActiveRoomProvider>
    </FavoritesProvider>
  );
}
