import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (don't require authentication)
  const isPublicPath =
    path === "/login" || path === "/forgot-password" || path === "/";

  // Check if the user is authenticated by looking for the auth cookie
  const isAuthenticated = request.cookies.has("salon-auth");

  // If the user is on a public path but is authenticated, redirect to the dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not on a public path and is not authenticated, redirect to the login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all paths except for:
    // - api routes
    // - static files (images, favicon, etc)
    // - _next (Next.js internal routes)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
