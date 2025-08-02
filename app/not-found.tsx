import Custom404 from "@/components/404";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found"
};

export default function NotFoundPage() {
  return (
    <>
      <Custom404 />
    </>
  );
}
