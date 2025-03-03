import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Bypass middleware untuk file statis
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/images')) {
    return NextResponse.next();
  }

  // Middleware logic (misalnya redirect atau auth check)
  return NextResponse.next();
}

// Terapkan middleware hanya pada rute tertentu
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};

