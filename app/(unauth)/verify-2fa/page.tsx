"use client";

import TwoFactorVerification from "@/app/(unauth)/verify-2fa/TwoFactorVerification";

export default function VerifyTwoFactorPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TwoFactorVerification />
      </div>
    </div>
  );
}
