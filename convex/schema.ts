import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // your own table, separate from better-auth’s `users`
  users: defineTable({
    openAiApiKey: v.optional(v.string()), // encrypted cipher-text
    openAiApiKeySet: v.boolean() // toggle for “Test Connection” button
  })
});
