import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Cek apakah user sudah login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Middleware User:", user); // Debugging

  const path = req.nextUrl.pathname;

  // Jika user belum login dan bukan di /login, redirect ke /login
  if (!user && path !== "/login") {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika user sudah login dan mengakses /login, redirect ke /
  if (user && path === "/login") {
    console.log("User sudah login, redirect ke /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Terapkan middleware ke semua halaman kecuali assets statis
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
