import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = ["tokorowear@gmail.com", "sjhosua19@gmail.com"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname === "/admin/unauthorized") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!req.auth?.user) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (!ADMIN_EMAILS.includes(req.auth.user.email!)) {
      return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
