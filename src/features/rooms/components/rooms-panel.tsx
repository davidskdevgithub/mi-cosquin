"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { useOnlineStatus } from "@/features/pwa";
import { Badge, Button, Text } from "@/ui";
import { useActiveRoom } from "../active-room.context";
import { readCachedRooms, writeCachedRooms } from "../rooms.helpers";
import type { Room } from "../rooms.types";
import { CreateRoomForm } from "./create-room-form";
import { JoinRoomForm } from "./join-room-form";
import { RoomDetail } from "./room-detail";

type PanelView = "list" | "create" | "join" | "detail";

interface RoomsPanelProps {
  userId: Id<"users">;
  /** Código de sala precargado (ej: desde query param ?sala=) */
  initialJoinCode?: string;
}

export const RoomsPanel = ({ userId, initialJoinCode }: RoomsPanelProps) => {
  const [view, setView] = useState<PanelView>("list");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { activeRoomId, setActiveRoom, clearActiveRoom } = useActiveRoom();
  const isOnline = useOnlineStatus();

  const convexMyRooms = useQuery(api.rooms.getMyRooms, { userId });
  const [cachedRooms, setCachedRooms] = useState<Room[] | null>(null);

  // Cachear rooms cuando hay conexión y datos nuevos
  useEffect(() => {
    if (isOnline && convexMyRooms) {
      writeCachedRooms(convexMyRooms);
    }
  }, [isOnline, convexMyRooms]);

  // Cargar cache al montar o cuando se pierde conexión
  useEffect(() => {
    if (!isOnline) {
      const cached = readCachedRooms();
      if (cached) {
        setCachedRooms(cached);
      }
    } else {
      setCachedRooms(null);
    }
  }, [isOnline]);

  // Usar datos de Convex si está online, sino usar cache
  const myRooms = isOnline ? convexMyRooms : cachedRooms;

  const createMutation = useMutation(api.rooms.create);
  const joinMutation = useMutation(api.rooms.join);

  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Si hay un código de sala en la URL, mostrar el form de unirse
  useEffect(() => {
    if (initialJoinCode) {
      setView("join");
    }
  }, [initialJoinCode]);

  const handleCreate = useCallback(
    async (name: string) => {
      setIsCreating(true);
      setError(null);
      try {
        await createMutation({ name, userId });
        // La query se actualiza reactivamente
        setView("list");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear la sala");
      } finally {
        setIsCreating(false);
      }
    },
    [createMutation, userId],
  );

  const handleJoin = useCallback(
    async (code: string) => {
      setIsJoining(true);
      setError(null);
      try {
        const result = await joinMutation({ code, userId });
        if (result.alreadyMember) {
          setError("Ya sos miembro de esta sala.");
        }
        setView("list");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al unirse a la sala",
        );
      } finally {
        setIsJoining(false);
      }
    },
    [joinMutation, userId],
  );

  const handleSelectRoom = useCallback((room: Room) => {
    setSelectedRoom(room);
    setView("detail");
    setError(null);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedRoom(null);
    setView("list");
    setError(null);
  }, []);

  // ─── Detail View ────────────────────────────────────────
  if (view === "detail" && selectedRoom) {
    return (
      <RoomDetail
        room={selectedRoom}
        currentUserId={userId}
        onBack={handleBack}
      />
    );
  }

  // ─── Create / Join / List Views ─────────────────────────
  return (
    <div className="flex flex-col gap-4">
      {/* Error */}
      {error && (
        <div className="px-3 py-2 bg-danger/20 border border-danger/40 rounded-base">
          <Text variant="caption" as="p">
            <span className="text-danger">{error}</span>
          </Text>
        </div>
      )}

      {/* Create view */}
      {view === "create" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text variant="label" as="h3">
              <span className="text-neutral-200">Crear sala</span>
            </Text>
            <button
              type="button"
              onClick={() => setView("list")}
              className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
          <CreateRoomForm onCreate={handleCreate} isCreating={isCreating} />
        </div>
      )}

      {/* Join view */}
      {view === "join" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text variant="label" as="h3">
              <span className="text-neutral-200">Unirse a sala</span>
            </Text>
            <button
              type="button"
              onClick={() => setView("list")}
              className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
          <JoinRoomForm
            onJoin={handleJoin}
            isJoining={isJoining}
            initialCode={initialJoinCode}
          />
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <>
          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              intent="primary"
              type="button"
              onClick={() => {
                setError(null);
                setView("create");
              }}
            >
              + Crear sala
            </Button>
            <Button
              size="sm"
              intent="secondary"
              type="button"
              onClick={() => {
                setError(null);
                setView("join");
              }}
            >
              Unirse
            </Button>
          </div>

          {/* Room list */}
          {myRooms === null || (myRooms === undefined && isOnline) ? (
            <Text variant="caption" as="p">
              <span className="text-neutral-500">Cargando salas...</span>
            </Text>
          ) : !myRooms || myRooms.length === 0 ? (
            <div className="text-center py-6">
              <Text variant="body" as="p">
                <span className="text-neutral-500">
                  No estás en ninguna sala. Creá una o unite con un código.
                </span>
              </Text>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {myRooms.map((room) => {
                const isActive = activeRoomId === room._id;
                return (
                  <div
                    key={room._id}
                    className={`flex items-center justify-between px-4 py-3 rounded-base transition-colors text-left ${
                      isActive
                        ? "bg-primary/15 border border-primary/40"
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectRoom(room as Room)}
                      className="flex flex-col gap-0.5 cursor-pointer flex-1 min-w-0"
                    >
                      <Text variant="label" as="span">
                        <span className="text-neutral-100">{room.name}</span>
                      </Text>
                      <Text variant="caption" as="span">
                        <span className="text-neutral-500">
                          por {room.creatorName}
                        </span>
                      </Text>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isActive) {
                            clearActiveRoom();
                          } else {
                            setActiveRoom(room._id, room.name);
                          }
                        }}
                        className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600 hover:text-neutral-200"
                        }`}
                        title={
                          isActive
                            ? "Dejar de ver en la grilla"
                            : "Ver favoritos en la grilla"
                        }
                      >
                        {isActive ? "✓ En grilla" : "Ver en grilla"}
                      </button>
                      <Badge variant="neutral" size="sm">
                        {room.memberCount}{" "}
                        {room.memberCount === 1 ? "miembro" : "miembros"}
                      </Badge>
                      <svg
                        className="w-4 h-4 text-neutral-500 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        onClick={() => handleSelectRoom(room as Room)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
