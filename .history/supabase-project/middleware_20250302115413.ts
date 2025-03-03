import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // ambil user dari Supabase
  const { data: { user } } = await supabase.auth.getUser();

  // jika user belum login, redirect ke /login
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ambil role dari tabel `users`
  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single();

  const path = req.nextUrl.pathname;

  // jika belum login dan mencoba akses halaman admin, redirect ke home
  if (!user && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // jika user bukan admin dan mencoba akses halaman admin, redirect ke home
  if (userRole?.role !== "admin" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// tentukan halaman mana yang kena middleware
export const config = {
    matcher: ["/admin/:path*", "//:path*"], // semua halaman dalam "/admin" & "/dashboard" hanya bisa diakses setelah login
  };
