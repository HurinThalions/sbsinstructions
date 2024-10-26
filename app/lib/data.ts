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
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        
        return anleitungen.rows;
    } catch (error) {
        console.error('Datenbankfehler1: ', error);
        throw new Error('Fehler beim Filtern der Anleitungen');
    }
}

export async function fetchAnleitungMitSchritten(id: string) {
    try {
        const anleitungHolen = await sql<Anleitung>`
            SELECT * 
            FROM anleitungen
            WHERE anleitungen.id = ${id}
        `;

        const anleitung = anleitungHolen.rows[0];

        if (!anleitung) {
            throw new Error('Anleitung nicht gefunden');
        }

        const schritteHolen = await sql<Anleitungsschritt>`
            SELECT *
            FROM anleitungsschritte
            WHERE anleitung_id = ${id}
            ORDER BY id
        `;

        anleitung.schritte = schritteHolen.rows;

        return anleitung;

    } catch (error) {
        console.error('Datenbankfehler2: ', error);
        throw new Error('Fehler beim Holen der Anleitung aus der Datenbank');
    }
}

export async function fetchletzteAnleitungUser(
    user: string
) {
    try {
        const anleitungen = await sql`
        SELECT id
        FROM anleitungen
        WHERE nutzername = ${user}
        ORDER BY created_at DESC
        LIMIT 1
        `;
        
        return anleitungen.rows[0]?.id || null;
    } catch (error) {
        console.error('Datenbankfehler3: ', error);
        throw new Error('Fehler beim holen der letzten Anleitung. Es können keine Anleitungsschritte zur passenden Anleitung erstellt werden');
    }
}

// export async function fetchpassendeAnleitungsschritte(
//     titel: string,
// ) {
//     try {
//         const anleitungsschritte = await sql<Anleitungsschritt>`
//             SELECT
//                 anleitungsschritte.anleitung_id,
//                 anleitungsschritte.title,
//                 anleitungsschritte.description,
//                 anleitungsschritte.image,
//                 anleitungsschritte.material
//             FROM anleitungsschritte
//             WHERE
//                 anleitungsschritte.title ILIKE ${`%${titel}%`}
//             ORDER BY anleitungsschritte.id DESC
//         `;

//         return anleitungsschritte.rows;
//     } catch (error) {
//         console.error('Datenbankfehler4: ', error);
//         throw new Error('Fehler beim Holen der Anleitungsschritte');
//     }
// }


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
