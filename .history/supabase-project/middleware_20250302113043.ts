import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // ambil user dari Supabase
  const { data: { user } } = await supabase.auth.getUser();

  // ambil role dari tabel `users`
  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single();

  const path = req.nextUrl.pathname;

  // Jika belum login dan mencoba akses halaman admin, redirect ke home
  if (!user && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Jika user bukan admin dan mencoba akses halaman admin, redirect ke home
  if (userRole?.role !== "admin" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Tentukan halaman mana yang kena middleware
export const config = {
  matcher: ["/admin/:path*"], // Semua halaman dalam "/admin" hanya bisa diakses Admin
};
