import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  
  console.log("Middleware terpanggil untuk path:", req.nextUrl.pathname);
  
  let res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();
  console.log("Middleware Session:", session);
  const path = req.nextUrl.pathname;

  // Jika belum login dan bukan di /login, redirect ke /login
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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
