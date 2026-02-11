import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    deviceToken: v.string(),
  }).index("by_device_token", ["deviceToken"]),

  favorites: defineTable({
    userId: v.id("users"),
    banda: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_banda", ["userId", "banda"]),
});
