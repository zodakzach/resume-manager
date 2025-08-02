import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/verify-2fa"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Skip Next internals & static files & your API
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const session = getSessionCookie(request);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // 2) If user is NOT signed in...
  if (!session) {
    // 2a) Allow landing "/" and auth routes
    if (pathname === "/" || isAuthRoute) {
      return NextResponse.next();
    }
    // 2b) Redirect all other (protected) pages → sign-in
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/sign-in";
    return NextResponse.redirect(signInUrl);
  }

  // 3) If user IS signed in...
  // 3a) Redirect "/" or any auth page → /dashboard
  if (pathname === "/" || isAuthRoute) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashUrl);
  }

  // 4) Otherwise—already signed in, non‐auth page—just go
  return NextResponse.next();
}

export const config = {
  // run on every request except static/assets and our API
  matcher: ["/((?!\\..*|_next/|api/).*)"]
};
