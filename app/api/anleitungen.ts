import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  const { query = '', page = 1 } = req.query;
  const offset = (Number(page) - 1) * 10;
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

    res.status(200).json(anleitungen.rows);
  } catch (error) {
    console.error('Datenbankfehler: ', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Anleitungen' });
  }
}