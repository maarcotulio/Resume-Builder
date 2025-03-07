import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default auth((request) => {
  const isLogged = !!request.auth;
  const { pathname } = request.nextUrl;
  const isPublicPath =
    pathname.startsWith("/auth") || pathname.startsWith("/api");

  if (isLogged && isPublicPath) {
    return NextResponse.redirect(new URL("/dash", request.nextUrl));
  }

  if (!isLogged && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
  }
});

export const config = {
  matcher: ["/dash", "/dash/:path", "/auth/signin", "/auth/signup"],
};
