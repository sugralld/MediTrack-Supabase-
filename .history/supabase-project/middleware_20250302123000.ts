import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Pastikan session diambil dengan `await`
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  // Jika user belum login dan bukan di /login, redirect ke /login
  if (!user && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika user sudah login dan mengakses /login, redirect ke /
  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Terapkan middleware ke semua halaman kecuali assets statis
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
