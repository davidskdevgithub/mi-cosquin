"use client";

import type { Id } from "@convex/_generated/dataModel";
import { useCallback, useEffect, useState } from "react";
import { HeaderMenu, type MenuView } from "@/components/header-menu";
import { RegisterForm, UserBadge, useIdentity } from "@/features/auth";
import {
  FavoritesProvider,
  getLocalFavoritesArray,
  useFavorites,
} from "@/features/favorites";
import { LineupPage } from "@/features/lineup";
import { OfflineBadge } from "@/features/pwa";
import {
  ActiveRoomProvider,
  RoomsPanel,
  useActiveRoom,
} from "@/features/rooms";
import { Badge } from "@/ui";

interface HeaderProps {
  joinCode?: string;
}

function Header({ joinCode }: HeaderProps) {
  const { identity, register } = useIdentity();
  const { isSyncing, pendingCount } = useFavorites();
  const [isRegistering, setIsRegistering] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>("main");

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

  const profileContent = (
    <div className="flex flex-col gap-4 py-2">
      {identity ? (
        <div className="flex flex-col gap-2">
          <p className="text-neutral-400">Logged in as:</p>
          <UserBadge username={identity.username} />
          <p className="text-sm text-neutral-500">ID: {identity.userId}</p>
        </div>
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          isRegistering={isRegistering}
        />
      )}
    </div>
  );

  const roomsContent = (
    <div className="py-2">
      {identity ? (
        <RoomsPanel userId={identity.userId} initialJoinCode={joinCode} />
      ) : (
        <p className="text-neutral-500 text-sm">
          Iniciá sesión para ver tus salas
        </p>
      )}
    </div>
  );

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
      <h1 className="text-xl font-bold text-primary">Mi Cosquin</h1>
      <div className="flex items-center gap-2">
        {isSyncing && (
          <Badge variant="warning" size="sm">
            Sync {pendingCount > 0 ? pendingCount : ""}
          </Badge>
        )}
        <OfflineBadge />

        {/* Settings Menu - contains profile and rooms */}
        <HeaderMenu
          isLoggedIn={!!identity}
          currentView={menuView}
          onViewChange={setMenuView}
          isOpen={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          profileContent={profileContent}
          roomsContent={roomsContent}
        />
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
        <div
          className="min-h-screen bg-neutral-900 text-neutral-100 bg-cover bg-right"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        >
          {/* <Header joinCode={joinCode} /> */}
          <main className="p-2 flex flex-col gap-2">
            {/* Panel de salas colapsable */}
            {/* {showRooms && identity && (
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-base p-4">
                <RoomsPanel
                  userId={identity.userId}
                  initialJoinCode={joinCode}
                />
              </div>
            )}
            <ActiveRoomBanner /> */}
            <LineupPage />
          </main>
        </div>
      </ActiveRoomProvider>
    </FavoritesProvider>
  );
}
