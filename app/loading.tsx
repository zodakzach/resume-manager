"use client";

import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center p-4"
    >
      <Spinner sizeClass="h-12 w-12" />
    </div>
  );
}
