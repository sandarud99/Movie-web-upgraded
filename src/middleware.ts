import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // noindex watch pages at the HTTP header level (X-Robots-Tag)
  if (pathname.startsWith("/watch") || pathname.startsWith("/watch-tv")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    response.headers.set("X-Robots-Tag", "index, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
