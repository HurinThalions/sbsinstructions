import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { anleitungId: string } }) {
    try {
      const { title, description, image, material } = await req.json();
      const { anleitungId } = params;
  
      // Speichere den Schritt in der Datenbank
      await sql`
        INSERT INTO anleitungsschritte (titel, beschreibung, bild, material, anleitung_id)
        VALUES (${title}, ${description}, ${image || null}, ${material || null}, ${anleitungId});
      `;
  
      return NextResponse.json({ message: 'Schritt erfolgreich erstellt' });
    } catch (error) {
      console.error('Fehler beim Speichern des Schritts:', error);
      return NextResponse.json({ error: 'Fehler beim Erstellen des Schritts' }, { status: 500 });
    }
  }