import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;

  // ⛔️ Allow public paths without auth
  const publicPaths = ["/login"];
  if (publicPaths.includes(path)) {
    return res;
  }

  // ⛔️ Kalau belum login dan bukan di public path, redirect ke login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Kalau ada session, cek role
  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error || !profile) {
    console.error("Gagal mendapatkan role:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = profile.role;
  console.log("User role:", role);

  // 🚫 Guest dilarang akses halaman admin
  if (role === "Guest" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚫 Admin dilarang akses halaman /
  if (role === "Admin" && path === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return res;
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
