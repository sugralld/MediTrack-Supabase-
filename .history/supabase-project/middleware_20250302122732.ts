import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Ambil user dari Supabase Auth
  const { data: { user } } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  // Jika user belum login, redirect ke /login
  if (!user && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika user sudah login dan membuka /login, redirect ke /
  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Middleware akan berlaku untuk semua halaman kecuali asset publik
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Semua halaman kecuali assets statis
};
