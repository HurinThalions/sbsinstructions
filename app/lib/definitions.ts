export type Anleitung = {
    id: number;
    titel: string;
    dauer: string;
    datum: string;
    bild: string;
}

export type Anleitungsschritt = {
    anleitung_id: number,
    id: number;
    titel: string;
    beschreibung: string;
    bild: string;
    material: string;
}

export type User = { 
    id: number;
    name: string;
    email: string;
    password: string;
}
