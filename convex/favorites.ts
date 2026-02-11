import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Obtener todas las bandas favoritas de un usuario.
 */
export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return favorites.map((f) => f.banda);
  },
});

/**
 * Toggle: si la banda está en favoritos la quita, si no la agrega.
 */
export const toggle = mutation({
  args: {
    userId: v.id("users"),
    banda: v.string(),
  },
  handler: async (ctx, { userId, banda }) => {
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_banda", (q) =>
        q.eq("userId", userId).eq("banda", banda),
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    }
    await ctx.db.insert("favorites", { userId, banda });
    return true;
  },
});
