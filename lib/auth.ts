import { betterAuth, BetterAuthOptions } from "better-auth";
import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuthComponent } from "../convex/auth";
import { GenericCtx } from "../convex/_generated/server";
import { siteUrl } from "./config";

// Configure BetterAuth to use only social providers (GitHub and Google)
const createOptions = (ctx: GenericCtx) =>
  ({
    appName: "Resume Manager",
    baseURL: siteUrl,
    trustedOrigins: [siteUrl],
    database: convexAdapter(ctx, betterAuthComponent),
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        accessType: "offline",
        prompt: "select_account+consent"
      }
    },
    user: {
      deleteUser: { enabled: true }
    }
  }) satisfies BetterAuthOptions;

export const createAuth = (ctx: GenericCtx) => {
  const options = createOptions(ctx);
  return betterAuth({
    ...options,
    plugins: [
      // Only the Convex plugin for session persistence
      convex({ options })
    ]
  });
};
