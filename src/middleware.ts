import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isApiAuth = pathname.startsWith("/api/auth");

  // Allow auth API and login page
  if (isApiAuth) return;

  if (isLoginPage) {
    // Already authenticated — send to dashboard
    if (req.auth) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return;
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin") && !req.auth) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
