"use client";

import SignUp from "@/app/(unauth)/sign-up/SignUp";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp />
        <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-orange-400 underline hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
