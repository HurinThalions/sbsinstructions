import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const eingeloggt = !!auth?.user;
      const aufderStartseite = nextUrl.pathname.startsWith('/');
      if (aufderStartseite) {
        if (eingeloggt) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (eingeloggt) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
