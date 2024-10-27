import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  try {
    const { title, duration, date, image, user } = await req.json();

    const result = await sql`
      INSERT INTO anleitungen (title, duration, date, image, nutzername)
      VALUES (${title}, ${duration}, ${date}, ${image}, ${user})
      RETURNING id, title;
    `;

    const anleitungId = result.rows[0].id;
    const anleitungTitel = result.rows[0].title
    return NextResponse.json({ id: anleitungId, title: anleitungTitel});

  } catch (error) {
    console.error('Fehler beim Speichern der Anleitung:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen der Anleitung' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || 1);
  const offset = (page - 1) * 10;
  const searchQuery = `%${query}%`;

  try {
    const anleitungen = await sql`
      SELECT
        id,
        title,
        duration,
        date,
        image
      FROM anleitungen
      WHERE
        anleitungen.title ILIKE ${searchQuery} OR
        anleitungen.date::text ILIKE ${searchQuery} OR
        anleitungen.duration::text ILIKE ${searchQuery}
      ORDER BY anleitungen.date DESC
      LIMIT 10 OFFSET ${offset};
    `;

    return NextResponse.json(anleitungen.rows);
  } catch (error) {
    console.error('Datenbankfehler: ', error);
    return NextResponse.json({ error: 'Fehler beim Abrufen der Anleitungen' }, { status: 500 });
  }
}