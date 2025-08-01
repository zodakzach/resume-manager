import "./polyfills";
import VerifyEmail from "./emails/verifyEmail";
import MagicLinkEmail from "./emails/magicLink";
import VerifyOTP from "./emails/verifyOTP";
import { render } from "@react-email/components";
import ResetPasswordEmail from "./emails/resetPassword";
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { type RunMutationCtx } from "@convex-dev/better-auth";

export const resend: Resend = new Resend(components.resend, {
  testMode: false
});

export const sendEmailVerification = async (
  ctx: RunMutationCtx,
  {
    to,
    url
  }: {
    to: string;
    url: string;
  }
) => {
  await resend.sendEmail(ctx, {
    from: "Test <onboarding@codeezy.dev>",
    to,
    subject: "Verify your email address",
    html: await render(<VerifyEmail url={url} />)
  });
};

export const sendOTPVerification = async (
  ctx: RunMutationCtx,
  {
    to,
    code
  }: {
    to: string;
    code: string;
  }
) => {
  await resend.sendEmail(ctx, {
    from: "Test <onboarding@codeezy.dev>",
    to,
    subject: "Verify your email address",
    html: await render(<VerifyOTP code={code} />)
  });
};

export const sendMagicLink = async (
  ctx: RunMutationCtx,
  {
    to,
    url
  }: {
    to: string;
    url: string;
  }
) => {
  await resend.sendEmail(ctx, {
    from: "Test <onboarding@codeezy.dev>",
    to,
    subject: "Sign in to your account",
    html: await render(<MagicLinkEmail url={url} />)
  });
};

export const sendResetPassword = async (
  ctx: RunMutationCtx,
  {
    to,
    url
  }: {
    to: string;
    url: string;
  }
) => {
  await resend.sendEmail(ctx, {
    from: "Test <onboarding@codeezy.dev>",
    to,
    subject: "Reset your password",
    html: await render(<ResetPasswordEmail url={url} />)
  });
};
