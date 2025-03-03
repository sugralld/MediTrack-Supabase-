import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Ambil user dari Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  // Kalau user belum login & bukan di /login, redirect ke /login
  if (!user && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Kalau sudah login & di /login, redirect ke /
  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Terapkan middleware ke semua halaman kecuali /login
export const config = {
  matcher: ["/((?!login).*)"],
};
