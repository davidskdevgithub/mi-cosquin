"use client";

import { useCallback, useState } from "react";
import { RegisterForm, UserBadge, useIdentity } from "@/features/auth";
import {
  getLocalFavoritesArray,
  LineupPage,
  useFavoritesSyncStatus,
} from "@/features/lineup";
import { OfflineBadge, useOnlineStatus } from "@/features/pwa";
import { Badge } from "@/ui";

export default function Home() {
  const { identity, register } = useIdentity();
  const isOnline = useOnlineStatus();
  const { isSyncing, pendingCount } = useFavoritesSyncStatus(identity?.userId);
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
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
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

      <main className="p-2">
        <LineupPage userId={identity?.userId} />
      </main>
    </div>
  );
}
