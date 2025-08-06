"use client";

import SignIn from "@/app/(unauth)/sign-in/SignIn";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignIn />
        <div className="mt-6 flex justify-center">
          <Link href="/" passHref>
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
