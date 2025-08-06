import {
  BetterAuth,
  type AuthFunctions,
  type PublicAuthFunctions
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import { query } from "./_generated/server";
import type { Id, DataModel } from "./_generated/dataModel";

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth;

// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
  publicAuthFunctions
});

// These are required named exports
export const {
  createUser,
  updateUser,
  deleteUser,
  createSession,
  isAuthenticated
} = betterAuthComponent.createAuthFunctions<DataModel>({
  onCreateUser: async (ctx) => {
    // Insert into your app-level users table with defaults
    const userId = await ctx.db.insert("users", {
      // Integrations: no OpenAI key yet
      openAiApiKeySet: false
    });

    return userId;
  },
  onDeleteUser: async (ctx, userId) => {
    await ctx.db.delete(userId as Id<"users">);
  }
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await betterAuthComponent.getAuthUser(ctx);
    if (!userMetadata) {
      return null;
    }
    // Get user data from your application's database (skip this if you have no
    // fields in your users table schema)
    const user = await ctx.db.get(userMetadata.userId as Id<"users">);
    return {
      ...user,
      ...userMetadata
    };
  }
});
