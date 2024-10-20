import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginURL = new URL('/signin', req.url);
    loginURL.searchParams.set('message', 'login_required');
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Anleitungerstellen/:path*'],
};