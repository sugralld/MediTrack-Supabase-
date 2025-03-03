import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  
  
  let res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // Jika belum login dan bukan di /login, redirect ke /login
  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika session sudah login dan mengakses /login, redirect ke /
  if (session && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }


  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
