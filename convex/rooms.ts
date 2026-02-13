import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sin O, I, L, 0, 1
const CODE_LENGTH = 6;

/**
 * Genera un código aleatorio de sala.
 */
const generateRoomCode = (): string => {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
};

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Obtener una sala por su código.
 */
export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    return await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", code.toUpperCase()))
      .unique();
  },
});

/**
 * Obtener todas las salas a las que pertenece un usuario.
 * Retorna la info de la sala + cantidad de miembros.
 */
export const getMyRooms = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const memberships = await ctx.db
      .query("room_members")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const rooms = [];
    for (const membership of memberships) {
      const room = await ctx.db.get(membership.roomId);
      if (!room) continue;

      const members = await ctx.db
        .query("room_members")
        .withIndex("by_room", (q) => q.eq("roomId", room._id))
        .collect();

      const creator = await ctx.db.get(room.createdBy);

      rooms.push({
        ...room,
        memberCount: members.length,
        creatorName: creator?.username ?? "???",
      });
    }

    return rooms;
  },
});

/**
 * Obtener los miembros de una sala con sus usernames.
 */
export const getMembers = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const memberships = await ctx.db
      .query("room_members")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();

    const members = [];
    for (const membership of memberships) {
      const user = await ctx.db.get(membership.userId);
      if (!user) continue;
      members.push({
        userId: user._id,
        username: user.username,
        joinedAt: membership.joinedAt,
      });
    }

    return members;
  },
});

/**
 * Datos para el heatmap: favoritos de cada miembro de la sala.
 * Reactivo — se actualiza cuando cualquier miembro cambia sus favoritos.
 */
export const getHeatmapData = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const memberships = await ctx.db
      .query("room_members")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();

    const membersData = [];
    for (const membership of memberships) {
      const user = await ctx.db.get(membership.userId);
      if (!user) continue;

      const favorites = await ctx.db
        .query("favorites")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      membersData.push({
        userId: user._id,
        username: user.username,
        favorites: favorites.map((f) => f.banda),
      });
    }

    return membersData;
  },
});

// ─── Mutations ───────────────────────────────────────────────────────────────

/**
 * Crear una sala nueva. El creador se agrega automáticamente como miembro.
 */
export const create = mutation({
  args: {
    name: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { name, userId }) => {
    // Generar código único
    let code = generateRoomCode();
    let existing = await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", code))
      .unique();

    // Reintentar si hay colisión (extremadamente raro)
    let attempts = 0;
    while (existing && attempts < 5) {
      code = generateRoomCode();
      existing = await ctx.db
        .query("rooms")
        .withIndex("by_code", (q) => q.eq("code", code))
        .unique();
      attempts++;
    }

    if (existing) {
      throw new Error("No se pudo generar un código único. Intenta de nuevo.");
    }

    const now = Date.now();

    const roomId = await ctx.db.insert("rooms", {
      code,
      name,
      createdBy: userId,
      createdAt: now,
    });

    // Agregar al creador como miembro
    await ctx.db.insert("room_members", {
      roomId,
      userId,
      joinedAt: now,
    });

    return { roomId, code };
  },
});

/**
 * Unirse a una sala por código.
 */
export const join = mutation({
  args: {
    code: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { code, userId }) => {
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", code.toUpperCase()))
      .unique();

    if (!room) {
      throw new Error("Sala no encontrada. Verificá el código.");
    }

    // Verificar que no sea ya miembro
    const existing = await ctx.db
      .query("room_members")
      .withIndex("by_room_user", (q) =>
        q.eq("roomId", room._id).eq("userId", userId),
      )
      .unique();

    if (existing) {
      return { roomId: room._id, alreadyMember: true };
    }

    await ctx.db.insert("room_members", {
      roomId: room._id,
      userId,
      joinedAt: Date.now(),
    });

    return { roomId: room._id, alreadyMember: false };
  },
});

/**
 * Abandonar una sala.
 */
export const leave = mutation({
  args: {
    roomId: v.id("rooms"),
    userId: v.id("users"),
  },
  handler: async (ctx, { roomId, userId }) => {
    const membership = await ctx.db
      .query("room_members")
      .withIndex("by_room_user", (q) =>
        q.eq("roomId", roomId).eq("userId", userId),
      )
      .unique();

    if (membership) {
      await ctx.db.delete(membership._id);
    }

    // Si no quedan miembros, borrar la sala
    const remaining = await ctx.db
      .query("room_members")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();

    if (remaining.length === 0) {
      await ctx.db.delete(roomId);
    }
  },
});
