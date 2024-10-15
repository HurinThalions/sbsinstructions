import { sql } from "@vercel/postgres";

import { Anleitung, Anleitungsschritt, User } from "./definitions";


const ITEMS_PER_PAGE = 6;

export async function fetchgefilterteAnleitungen(
    query: string, 
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const searchQuery = `%${query}%`

    try {
        const anleitungen = await sql<Anleitung>`
        SELECT
            anleitungen.id,
            anleitungen.titel,
            anleitungen.dauer,
            anleitungen.datum,
            anleitungen.bild
        FROM anleitungen
        WHERE
            anleitungen.titel ILIKE ${searchQuery} OR
            anleitungen.datum ILIKE ${searchQuery} OR
            anleitungen.dauer ILIKE ${searchQuery}
        ORDER BY anleitungen.datum DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return anleitungen.rows;
    } catch (error) {
        console.error('Datenbankfehler3: ', error);
        throw new Error('Fehler beim Filtern der Anleitungen');
    }
}

export async function fetchAnleitungMitSchritten(anleitungId: string) {
    const anleitung = await sql<Anleitung[]>`
      SELECT * 
      FROM Anleitungen
      JOIN Anleitungsschritte ON Anleitungen.id = Anleitungsschritte.anleitung_id
      WHERE Anleitungen.id = ${anleitungId}
    `;
    return anleitung;
  }

export async function fetchpassendeAnleitungsschritte(
    titel: string,
) {
    try {
        const anleitungsschritte = await sql<Anleitungsschritt>`
        SELECT
            anleitungsschritte.anleitung_id,
            anleitungsschritte.titel,
            anleitungsschritte.beschreibung,
            anleitungsschritte.bild,
            anleitungsschritte.material
        FROM anleitungsschritte
        WHERE
            anleitungsschritte.anleitung_id LIKE ${titel}
        ORDER BY anleitungsschritte.id DESC
        `;

        return anleitungsschritte.rows;
    } catch (error) {
        console.error('Datenbankfehler: ', error);
        throw new Error('Fehler beim holen der Anleitungsschritte');
    }
}


// export async function fetchUser() {

//     try {
//         const data = await sql<User>`
//         SELECT
//             id,
//             name,
//             email,
//         FROM user
//         `;

//         return data.rows;
//     } catch {
//         console.error('Datenbankfehler: ', error);
//         throw new Error('Fehler beim holen der User');
//     }
// }

// export async function fetchAnleitungen() {

//     try {
//         const data = await sql<Anleitung>`
//         SELECT * FROM anleitungen ORDER BY titel ASC
//         LIMIT 6
//     `
//     const anleitungen = data.rows;
//     return anleitungen;
//     } catch (error) {
//         console.error('Datenbankfehler1: ', error);
//         throw new Error('Anleitungen holen fehlgeschlagen');
//     }
// }

// export async function fetchletzteAnleitung() {

//     try {
//         const data = await sql<Anleitung>`
//         SELECT anleitungen.id, anleitungen.titel, anleitungen.dauer, anleitungen.datum, anleitungen.bild
//         FROM anleitungen
//         ORDER BY anleitungen.datum DESC
//         LIMIT 1`;

//         const anleitung = data.rows;
//         return anleitung;
//     } catch (error) {
//         console.error('Datenbankfehler2: ', error);
//         throw new Error('Fehler beim holen der letzten Anleitung');
//     }
// }
