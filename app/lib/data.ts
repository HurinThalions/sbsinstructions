import { sql } from "@vercel/postgres";

import { Anleitung } from "./definitions";

export async function fetchAnleitungen() {

    try {
        const data = await sql<Anleitung>`
        SELECT * FROM anleitungen ORDER BY titel ASC
    `
    const anleitungen = data.rows;
    return anleitungen;
    } catch (error) {
        console.error('Datenbank fehler', error);
        throw new Error('Anleitungen holen fehlgeschlagen');
    }
}
