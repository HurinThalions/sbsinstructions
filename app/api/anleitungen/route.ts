import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, duration, date, image, user } = await req.json();

    // Nutze 'nutzername' statt 'user'
    await sql`
      INSERT INTO anleitungen (title, duration, date, image, nutzername)
      VALUES (${title}, ${duration}, ${date}, ${image}, ${user});
    `;

    return NextResponse.json({ message: 'Anleitung erfolgreich erstellt' });
  } catch (error) {
    console.error('Fehler beim Speichern der Anleitung:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen der Anleitung' }, { status: 500 });
  }
}

