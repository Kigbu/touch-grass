import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for a protected route (dashboard or account)
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/account');

  if (isProtectedRoute) {
    // Check for wallet connection cookie
    const hasWalletConnection = request.cookies.get('wallet-connected')?.value === 'true';

    if (!hasWalletConnection) {
      // Redirect to main page for wallet connection
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect dashboard and account routes
    '/dashboard',
    '/dashboard/:path*',
    '/account',
    '/account/:path*',
  ],
};