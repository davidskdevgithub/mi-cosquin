import type { Id } from "@convex/_generated/dataModel";

/** Datos de una sala como llegan desde Convex */
export interface Room {
  _id: Id<"rooms">;
  code: string;
  name: string;
  createdBy: Id<"users">;
  createdAt: number;
  memberCount: number;
  creatorName: string;
}

/** Miembro de una sala */
export interface RoomMember {
  userId: Id<"users">;
  username: string;
  joinedAt: number;
}

/** Datos de un miembro con sus favoritos (para heatmap) */
export interface MemberWithFavorites {
  userId: Id<"users">;
  username: string;
  favorites: string[];
}

/** Entrada procesada del heatmap: una banda y quiénes la tienen */
export interface HeatmapEntry {
  banda: string;
  members: string[];
  count: number;
}

/** Agrupación del heatmap por nivel de coincidencia */
export interface HeatmapGroup {
  label: string;
  /** Ratio mínimo (inclusive) para pertenecer a este grupo */
  minRatio: number;
  entries: HeatmapEntry[];
}
