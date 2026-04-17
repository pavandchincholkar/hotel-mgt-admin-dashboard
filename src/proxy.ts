import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the cookie exists
  const isAuthenticated = request.cookies.get("auth_session")?.value;

  // 1. ALLOW the login page and static assets to load no matter what
  if (
    pathname === '/login' || 
    pathname.startsWith('/_next') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. PROTECT: If not logged in, force to /login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. LOGIC: If already logged in, don't let them see the /login page
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // This matcher ensures the proxy runs on every single page
  matcher: ['/:path*'],
};