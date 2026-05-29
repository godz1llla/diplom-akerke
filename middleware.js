import { NextResponse } from 'next/server';

// Auth is handled client-side in AuthContext + DashboardLayout.
// Middleware only passes cookies through to keep the session alive.
export async function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
