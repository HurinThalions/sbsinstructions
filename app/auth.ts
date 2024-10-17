import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import type { User } from '@/app/lib/definitions';

// Funktion, um einen Benutzer anhand der E-Mail abzurufen
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return undefined; // Gib undefined zurück, falls ein Fehler auftritt
  }
}

// NextAuth Konfiguration
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validierung der Anmeldeinformationen
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Ungültige Angaben');
          return null; // Anmeldeinformationen sind ungültig
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) {
          console.log('Nutzer nicht gefunden');
          return null; // Benutzer existiert nicht
        }

        // Überprüfe das Passwort mit bcrypt
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log('Das Passwort ist falsch.');
          return null; // Falsches Passwort
        }

        // Erfolgreiche Anmeldung, Benutzerinformationen zurückgeben
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Setze dein SECRET für JWT
  pages: {
    signIn: '/signin', // Anmeldeseite
  },
  callbacks: {
    async session({ session, token }) {
      // Füge benutzerdefinierte Felder zur Session hinzu
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Füge Informationen zum JWT-Token hinzu
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});