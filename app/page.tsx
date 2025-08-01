"use client";

import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery
} from "convex/react";
import { authClient } from "@/lib/auth-client";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const router = useRouter();

  return (
    // Outer container to center content and set basic background
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <AuthLoading>
        <div className="text-xl text-gray-700">Loading application...</div>
      </AuthLoading>

      <Unauthenticated>
        {/* If unauthenticated, show the landing page content */}
        <LandingPageContent />
      </Unauthenticated>

      <Authenticated>
        <Dashboard />
      </Authenticated>
    </div>
  );
}

// New component for the landing page content (before authentication)
function LandingPageContent() {
  const router = useRouter(); // Initialize router inside the component

  const handleSignInClick = () => {
    router.push("/sign-in"); // Redirect to your dedicated sign-in page
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <h1 className="mb-6 text-6xl leading-tight font-extrabold text-gray-900">
        Your Resume, Elevated by AI
      </h1>
      <p className="mb-12 max-w-2xl text-xl text-gray-600">
        Intelligently manage, optimize, and showcase your professional story.
        Craft compelling resumes with ease and precision.
      </p>

      {/* The main AI sign-in button that navigates */}
      <button
        onClick={handleSignInClick}
        className="focus:ring-opacity-70 transform rounded-full bg-gradient-to-r from-blue-600 to-purple-700 px-10 py-5 text-2xl font-bold text-white shadow-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:from-blue-700 hover:to-purple-800 hover:shadow-2xl focus:ring-4 focus:ring-blue-500 focus:outline-none"
      >
        AI-Powered Sign In
      </button>
    </div>
  );
}

// Your existing Dashboard component (assume it's on /dashboard)
// It is no longer directly rendered on the root page if authenticated, but redirected to.
function Dashboard() {
  const user = useQuery(api.auth.getCurrentUser);
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-md">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        Welcome to your Dashboard!
      </h2>
      <div className="mb-6 text-xl text-gray-700">Hello {user?.name}!</div>
      <button
        onClick={() => authClient.signOut()}
        className="rounded-md bg-red-600 px-6 py-3 font-semibold text-white shadow transition duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
      >
        Sign out
      </button>
    </div>
  );
}
