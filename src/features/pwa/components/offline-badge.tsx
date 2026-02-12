"use client";

import { Badge } from "@/ui";
import { useOnlineStatus } from "../pwa.hooks";

export const OfflineBadge = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <Badge variant="warning" size="sm">
      <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
      Offline
    </Badge>
  );
};
