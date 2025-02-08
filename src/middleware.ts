import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/search', '/sign-in', '/sign-up', '/'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token && url.pathname === '/') {
    return NextResponse.redirect(new URL('/search', request.url));
  }
  if (!token && url.pathname.startsWith('/search')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
