import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("barkUserToken")?.value;
  const pathname = request.nextUrl.pathname;

  // 🔐 Protect seller routes
  if (!token && pathname.startsWith("/sellers")) {
    return NextResponse.redirect(
      new URL("/en/gb/login", request.url)
    );
  }

  // 🚫 Prevent logged-in users from visiting login pages
  if (
    token &&
    (pathname === "/en/gb/login" ||
      pathname === "/en/gb/passwordless_login")
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/en/gb/seller/:path*",
    "/en/gb/login",
    "/en/gb/passwordless_login",
  ],
};

