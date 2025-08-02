"use client";

import { useRouter } from "next/navigation";

export default function LandingPageContent() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <h1 className="text-primary mb-6 text-6xl leading-tight font-extrabold">
        Your Resume, Elevated by AI
      </h1>
      <p className="text-foreground mb-12 max-w-2xl text-xl">
        Intelligently manage, optimize, and showcase your professional story.
        Craft compelling resumes with ease and precision.
      </p>
      <button
        onClick={handleGetStarted}
        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-700 px-10 py-5 text-2xl font-bold text-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-purple-800 hover:shadow-2xl focus:ring-4 focus:ring-blue-500 focus:outline-none"
      >
        Get Started
      </button>
    </div>
  );
}
