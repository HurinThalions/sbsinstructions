'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

// Authentifizierungslogik wird auf Client-Seite verschoben
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  // Diese Logik sollte auf Client-Seite implementiert werden
  // `signIn` kann nur im Client verwendet werden
  return "Authentifizierung wird clientseitig durchgeführt.";
}

// Registrierungsfunktion
const RegisterUser = z.object({
  name: z.string({
    invalid_type_error: 'Bitte Namen eingeben.',
  }),
  email: z.string({
    invalid_type_error: 'Bitte eine E-Mail angeben.',
  }).email('Bitte eine gültige E-Mail-Adresse eingeben.'),
  password: z.string({
    invalid_type_error: 'Bitte wählen Sie ein Passwort.',
  }).min(6, 'Das Passwort muss mindestens 6 Zeichen lang sein.'),
  confirmPassword: z.string({
    invalid_type_error: 'Bitte wiederholen Sie ihr Passwort.',
  }),
});

export async function register(
  prevState: string | null,
  formData: FormData,
) {
  const validatedFields = RegisterUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmpassword'),
  });

  if (!validatedFields.success) {
    return "Unausgefüllte Felder. Es konnte kein Account erstellt werden";
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return "Die Passworteingaben stimmen nicht überein.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword});
    `;
  } catch (error) {
    console.error('Datenbankfehler: ', error);
    throw new Error('Fehler beim Abspeichern des neuen Nutzers');
  }

  redirect('/signin');
}