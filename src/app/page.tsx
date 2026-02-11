"use client";

import { useCallback, useState } from "react";
import { RegisterForm, UserBadge, useIdentity } from "@/features/auth";
import {
  FavoritesProvider,
  getLocalFavoritesArray,
  useFavorites,
} from "@/features/favorites";
import { LineupPage } from "@/features/lineup";
import { OfflineBadge, useOnlineStatus } from "@/features/pwa";
import { Badge } from "@/ui";

function Header() {
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

export default function Home() {
  const { identity } = useIdentity();

  return (
    <FavoritesProvider userId={identity?.userId}>
      <div className="min-h-screen bg-neutral-900 text-neutral-100">
        <Header />
        <main className="p-2">
          <LineupPage />
        </main>
      </div>
    </FavoritesProvider>
  );
}
