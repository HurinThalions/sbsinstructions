'use server';
 
import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import { arrayOutputType, z } from 'zod';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'

import { registrierung } from '../ui/auth/signup_form';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
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
    redirect('/');
  }

const RegisterUser = z.object({
    name: z.string({
      invalid_type_error: 'Bitte namen eingeben.',
    }),
    email: z.string({
      invalid_type_error: 'Please enter an email address.',
    }),
    password: z.string({
      invalid_type_error: 'Please enter a password.',
    }),
    confirmPassword: z.string({
      invalid_type_error: 'Please confirm your password.',
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
      return "Missing Fields. Failed to Create Account."
    }
  
    const { name, email, password, confirmPassword } = validatedFields.data
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return "Passwords don't match."
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
