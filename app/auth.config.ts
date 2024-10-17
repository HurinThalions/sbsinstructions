import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Die Logik zur Autorisierung bleibt in auth.ts
        return null; // Oder falls du es hier implementierst, die entsprechende Logik.
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, 
};