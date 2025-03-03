import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Ambil session, bukan hanya user
  const { data: { session } } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // Redirect ke /login jika belum login (kecuali halaman login)
  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Ambil role dari tabel `users`
  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", session?.user.id)
    .single();

  // Proteksi halaman admin hanya untuk admin
  if (userRole?.role !== "admin" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Tentukan halaman mana yang terkena middleware
export const config = {
  matcher: ["/((?!login|signup).*)"], // Semua halaman kecuali /login & /signup butuh login
};
