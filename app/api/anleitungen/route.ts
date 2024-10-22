import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, duration, date, image, user } = await req.json();

    // Anleitung in die Datenbank einfügen und die ID der neu erstellten Anleitung zurückgeben
    const result = await sql`
      INSERT INTO anleitungen (title, duration, date, image, nutzername)
      VALUES (${title}, ${duration}, ${date}, ${image}, ${user})
      RETURNING id;
    `;

    // Hole die ID der neu erstellten Anleitung
    const anleitungId = result.rows[0].id;

    // Sende die ID in der Antwort zurück
    return NextResponse.json({ id: anleitungId, message: 'Anleitung erfolgreich erstellt' });
  } catch (error) {
    console.error('Fehler beim Speichern der Anleitung:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen der Anleitung' }, { status: 500 });
  }
}