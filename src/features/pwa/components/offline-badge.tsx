"use client";

import { useOnlineStatus } from "../pwa.hooks";

export const OfflineBadge = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-favorite/90 text-neutral-900 text-xs font-semibold rounded-md">
      <span className="inline-block w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
      Offline
    </div>
  );
};
