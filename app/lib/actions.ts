'use server';
 
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  try {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (result?.error) {
      return 'Ungültige Angaben.'; // Fehlerhafte Anmeldedaten
    } else {
      redirect('/');
    }

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Ungültige Angaben.';
        default:
          return 'Etwas ist schief gelaufen.';
      }
    }
    throw error;
  }
}

const RegisterUser = z.object({
    name: z.string({
      invalid_type_error: 'Bitte namen eingeben.',
    }),
    email: z.string({
      invalid_type_error: 'PBitte eine E-Mail angeben.',
    }),
    password: z.string({
      invalid_type_error: 'Bitte wählen Sie ein Passwort.',
    }),
    confirmPassword: z.string({
      invalid_type_error: 'Bitte wiederholen Sie ihr Passwort.',
    }),
})

export async function register(
    prevState: string | null,
    formData: FormData,
  ) {
  
    const validatedFields = RegisterUser.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmpassword'),
    })
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return "Unausgefüllte Felder. Es konnte kein Account erstellt werden"
    }
  
    const { name, email, password, confirmPassword } = validatedFields.data
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return "Die Passworteingaben stimmen nicht überein."
    }
  
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()
  
    try {
      await sql`
        INSERT INTO users
        VALUES (${id}, ${name}, ${email}, ${hashedPassword});
      `
    } catch (error) {
      console.error('Datenbankfehler: ', error);
      throw new Error('Fehler beim abspeichern des neuen Nutzers');
    }
  
    redirect('/signin')
}
