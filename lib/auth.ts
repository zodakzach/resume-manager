import { betterAuth, BetterAuthOptions } from "better-auth";
import { twoFactor, emailOTP, magicLink } from "better-auth/plugins";
import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import {
  sendMagicLink,
  sendOTPVerification,
  sendEmailVerification,
  sendResetPassword,
} from "../convex/email";
import { betterAuthComponent } from "../convex/auth";
import { requireMutationCtx } from "@convex-dev/better-auth/utils";
import { GenericCtx } from "../convex/_generated/server";
import { siteUrl } from "./config";

// Split out options so they can be passed to the convex plugin
const createOptions = (ctx: GenericCtx) =>
  ({
    appName: "Resume Manager",
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmailVerification(requireMutationCtx(ctx), {
          to: user.email,
          url,
        });
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await sendResetPassword(requireMutationCtx(ctx), {
          to: user.email,
          url,
        });
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        accessType: "offline",
        prompt: "select_account+consent",
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    plugins: [
      twoFactor(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          await sendMagicLink(requireMutationCtx(ctx), {
            to: email,
            url,
          });
        },
      }),
      emailOTP({
        async sendVerificationOTP({ email, otp, type}) {
          await sendOTPVerification(requireMutationCtx(ctx), {
            to: email,
            code: otp,
          });
        },
      }),
    ],
  }) satisfies BetterAuthOptions;

export const createAuth = (ctx: GenericCtx) => {
  const options = createOptions(ctx);
  return betterAuth({
    ...options,
    plugins: [
      ...options.plugins,
      // Pass in options so plugin schema inference flows through. Only required
      // for plugins that customize the user or session schema.
      // See "Some caveats":
      // https://www.better-auth.com/docs/concepts/session-management#customizing-session-response
      convex({ options }),
    ],
  });
};
