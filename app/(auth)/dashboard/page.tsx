"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/example/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";

export default function DashboardClient() {
  const user = useQuery(api.auth.getCurrentUser);
  const router = useRouter();
  // 1) While auth is still “in flight” (undefined) OR
  //    once we’ve determined they’re not signed in (null),
  //    render nothing (so your global loading UI or middleware redirect can take over).
  if (user === undefined || user === null) {
    return <Loading />;
  }

  // 2) From here on out, TS knows `user` is your full CurrentUser type
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-4xl font-bold">Welcome, {user.name}!</h1>
      <p className="mb-4 text-gray-600">Email: {user.email}</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
