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

  rooms: defineTable({
    code: v.string(),
    name: v.string(),
    createdBy: v.id("users"),
    createdAt: v.number(),
  }).index("by_code", ["code"]),

  room_members: defineTable({
    roomId: v.id("rooms"),
    userId: v.id("users"),
    joinedAt: v.number(),
  })
    .index("by_room", ["roomId"])
    .index("by_user", ["userId"])
    .index("by_room_user", ["roomId", "userId"]),
});
