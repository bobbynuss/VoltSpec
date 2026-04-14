import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check maintenance mode
  if (process.env.MAINTENANCE_MODE === "true") {
    const { pathname } = request.nextUrl;

    // Allow the maintenance page itself, static assets, and API health checks
    if (
      pathname === "/maintenance" ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api/health") ||
      pathname.startsWith("/favicon") ||
      pathname.endsWith(".png") ||
      pathname.endsWith(".svg") ||
      pathname.endsWith(".ico") ||
      pathname.endsWith(".webmanifest")
    ) {
      return NextResponse.next();
    }

    // Redirect everything else to maintenance page
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image).*)",
  ],
};
