"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Only render real UI once mounted, to avoid SSR hydration mismatches
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled />;
  }

  // Determine what the user is *actually* seeing:
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    // flip based on what they see right now
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-transform" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-transform" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
