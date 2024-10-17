import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { User } from 'next-auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Anmeldedaten fehlen');
        }

        const { email, password } = credentials;

        try {
          // Suche den Benutzer in der Datenbank
          const user = await sql`SELECT * FROM users WHERE email = ${email}`;
          if (!user.rows.length) {
            throw new Error('Kein Benutzer mit dieser E-Mail gefunden');
          }

          const foundUser = user.rows[0];

          // Vergleiche das Passwort
          const passwordsMatch = await bcrypt.compare(password, foundUser.password);
          if (!passwordsMatch) {
            throw new Error('Ungültiges Passwort');
          }

          // Rückgabe des Benutzers nach erfolgreicher Authentifizierung
          return { id: foundUser.id, name: foundUser.name, email: foundUser.email };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as 'jwt', // Stelle sicher, dass 'jwt' als spezifischer Wert gesetzt ist
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);