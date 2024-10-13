import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // authConfig wird hier eingebunden
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(), 
            password: z.string().min(6)
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Ungültige Angaben');
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        // Überprüfung, ob Benutzer gefunden wurde
        if (!user) {
          console.log('Nutzer nicht gefunden');
          return null;
        }

        // Passwortvergleich mit bcrypt
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          console.log('Erfolgreich eingeloggt');
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else {
          console.log('Das Passwort ist falsch.');
          return null;
        }
      },
    }),
  ],
});