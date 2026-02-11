import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Obtener un usuario por su deviceToken.
 */
export const getByDeviceToken = query({
  args: { deviceToken: v.string() },
  handler: async (ctx, { deviceToken }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_device_token", (q) => q.eq("deviceToken", deviceToken))
      .unique();
  },
});

/**
 * Registrar un nuevo usuario con username + deviceToken.
 * Retorna el ID del usuario creado.
 */
export const register = mutation({
  args: {
    username: v.string(),
    deviceToken: v.string(),
    /** Favoritos existentes en localStorage para sincronizar */
    localFavorites: v.array(v.string()),
  },
  handler: async (ctx, { username, deviceToken, localFavorites }) => {
    // Verificar que no exista ya un usuario con ese deviceToken
    const existing = await ctx.db
      .query("users")
      .withIndex("by_device_token", (q) => q.eq("deviceToken", deviceToken))
      .unique();

    if (existing) {
      return existing._id;
    }

    const userId = await ctx.db.insert("users", { username, deviceToken });

    // Sincronizar favoritos locales al crear la cuenta
    for (const banda of localFavorites) {
      await ctx.db.insert("favorites", { userId, banda });
    }

    return userId;
  },
});
