import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, duration, date, image, user } = await req.json();

    const result = await sql`
      INSERT INTO anleitungen (title, duration, date, image, nutzername)
      VALUES (${title}, ${duration}, ${date}, ${image}, ${user})
      RETURNING id;
    `;

    const anleitungId = result.rows[0].id;
    return NextResponse.json({ id: anleitungId});

  } catch (error) {
    console.error('Fehler beim Speichern der Anleitung:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen der Anleitung' }, { status: 500 });
  }
}
