// import { NextRequest, NextResponse } from "next/server";
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   // Ambil user dari Supabase
//   const { data: { user } } = await supabase.auth.getUser();

//   const path = req.nextUrl.pathname;

  // Jika belum login dan bukan di halaman /login, redirect ke /login
//   if (!user && path !== "/login") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Jika sudah login dan mencoba akses /login, redirect ke home
//   if (user && path === "/login") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return res;
// }

// // Tentukan halaman mana yang terkena middleware
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Middleware untuk semua halaman kecuali API, static files, dll.
// };
