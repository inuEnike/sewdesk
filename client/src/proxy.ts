import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("sewdesk.sid");
  const pathName = request.nextUrl.pathname;

  const isAuthPages = pathName === "/login" || pathName === "/signup";

  const isProtectedPage = pathName.startsWith("/dashboard");

  if (sessionCookie && isAuthPages) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
