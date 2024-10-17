console.log('Middleware geladen');

import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt'; 

export default NextAuth(authConfig).auth;
 
export async function middleware(req: NextRequest) {

  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET });

  console.log('Token: ', token);

  if (!token) {
    const loginURL = new URL('/signin', req.url);
    return NextResponse.redirect(loginURL);
  }

  console.log('Eingeloggt, zugriff gewährt');
  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/Anleitungerstellen'],
};