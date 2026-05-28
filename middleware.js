import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ninulpxcmdkpmjgmmmqa.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ka9rr5g-A51MRWcbaS_ljQ_VH9XVfAt',
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Protected routes
  if (path.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Fetch role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role || 'student';

    // Admin trying to access student dashboard
    if (path.startsWith('/dashboard/student') && role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    // Student trying to access admin dashboard
    if (path.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/student', request.url));
    }
    // /dashboard → redirect to role dashboard
    if (path === '/dashboard') {
      return NextResponse.redirect(
        new URL(role === 'admin' ? '/dashboard/admin' : '/dashboard/student', request.url)
      );
    }
  }

  // Auth pages — redirect if already logged in
  if ((path === '/auth/login' || path === '/auth/register') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    const role = profile?.role || 'student';
    return NextResponse.redirect(
      new URL(role === 'admin' ? '/dashboard/admin' : '/dashboard/student', request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
