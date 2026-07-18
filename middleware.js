import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "./lib/auth";

export function middleware(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"]
};
