import { sql } from "@vercel/postgres";

import { Anleitung } from "./definitions";

export async function fetchAnleitungen() {

    try {
        const data = await sql<Anleitung>`
        SELECT * FROM anleitungen ORDER BY titel ASC
        LIMIT 6
    `
    const anleitungen = data.rows;
    return anleitungen;
    } catch (error) {
        console.error('Datenbank fehler', error);
        throw new Error('Anleitungen holen fehlgeschlagen');
    }
}


export async function fetchletzteAnleitung() {

    try {
        const data = await sql<Anleitung>`
        SELECT anleitungen.id, anleitungen.titel, anleitungen.dauer, anleitungen.datum, anleitungen.bild
        FROM anleitungen
        ORDER BY anleitungen.datum DESC
        LIMIT 1`;

        const anleitung = data.rows;
        return anleitung;
    } catch (error) {
        console.error('Datenbank fehler: ', error);
        throw new Error('Fehler beim holen der letzten Anleitung');
    }
}