import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('Token: ', token);

  if (!token) {
    const loginURL = new URL('/signin', req.url);
    return NextResponse.redirect(loginURL);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/Anleitungerstellen'],
};