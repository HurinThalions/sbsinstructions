import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest } from 'next/server';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export function middleware(request: NextRequest) {

  const nutzer = request.cookies.get('jetztigerNutzer')?.value;

  if (nutzer && !request.nextUrl.pathname.startsWith('/Anleitungerstellen')) {
    console.log('du bist eingeloggt');
    return Response.redirect(new URL('/Anleitungerstellen', request.url))

  } else {
    Response.redirect(new URL('/signin', request.url));
  }
}