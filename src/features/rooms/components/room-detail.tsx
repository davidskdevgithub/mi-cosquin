"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useState } from "react";
import { Button, Text } from "@/ui";
import type { Room } from "../rooms.types";
import { RoomHeatmap } from "./room-heatmap";
import { RoomMembers } from "./room-members";
import { RoomQR } from "./room-qr";

interface RoomDetailProps {
  room: Room;
  currentUserId: Id<"users">;
  onBack: () => void;
}

export const RoomDetail = ({
  room,
  currentUserId,
  onBack,
}: RoomDetailProps) => {
  const members = useQuery(api.rooms.getMembers, { roomId: room._id });
  const heatmapData = useQuery(api.rooms.getHeatmapData, {
    roomId: room._id,
  });
  const leaveMutation = useMutation(api.rooms.leave);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleLeave = useCallback(async () => {
    if (!confirm("¿Seguro que querés salir de esta sala?")) return;
    setIsLeaving(true);
    try {
      await leaveMutation({ roomId: room._id, userId: currentUserId });
      onBack();
    } catch (err) {
      console.error("[Rooms] Leave failed:", err);
    } finally {
      setIsLeaving(false);
    }
  }, [leaveMutation, room._id, currentUserId, onBack]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer text-sm"
        >
          ← Mis Salas
        </button>
        <Button
          size="sm"
          intent="ghost"
          type="button"
          onClick={handleLeave}
          disabled={isLeaving}
        >
          {isLeaving ? "Saliendo..." : "Salir"}
        </Button>
      </div>

      {/* Room info */}
      <div>
        <Text variant="h3" as="h3">
          <span className="text-neutral-100">{room.name}</span>
        </Text>
        <Text variant="caption" as="p">
          <span className="text-neutral-400">
            Creada por {room.creatorName} · {room.memberCount} miembros
          </span>
        </Text>
      </div>

      {/* QR toggle */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer"
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
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          {showQR ? "Ocultar QR" : "Compartir QR"}
        </button>
        {showQR && <RoomQR code={room.code} />}
      </div>

      {/* Members */}
      <div className="flex flex-col gap-2">
        <Text variant="label" as="h4">
          <span className="text-neutral-300">Miembros</span>
        </Text>
        {members ? (
          <RoomMembers members={members} currentUserId={currentUserId} />
        ) : (
          <Text variant="caption" as="p">
            <span className="text-neutral-500">Cargando miembros...</span>
          </Text>
        )}
      </div>

      {/* Heatmap */}
      <div className="flex flex-col gap-2">
        <Text variant="label" as="h4">
          <span className="text-neutral-300">Mapa de Calor</span>
        </Text>
        <Text variant="caption" as="p">
          <span className="text-neutral-500">
            Bandas que coinciden entre los miembros de la sala
          </span>
        </Text>
        {heatmapData ? (
          <RoomHeatmap membersData={heatmapData} />
        ) : (
          <Text variant="caption" as="p">
            <span className="text-neutral-500">Cargando coincidencias...</span>
          </Text>
        )}
      </div>
    </div>
  );
};
