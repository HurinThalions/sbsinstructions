export type Anleitung = {
    id: number;
    titel: string;
    dauer: string;
    datum: string;
    bild: string;
    schritte?: Anleitungsschritt[];  // Optional: Liste der Anleitungsschritte
}

export type Anleitungsschritt = {
    id: number;
    titel: string;
    beschreibung: string;
    bild: string;
    material: string;
    anleitung_id: string;  // Fremdschlüssel zur Anleitung
}


export type User = { 
    id: string;
    name: string;
    email: string;
    password: string;
}
