export type Anleitung = {
    id: number;
    title: string;
    duration: number;
    date: string;
    image?: string;
    user: string;
    created_at: string;
    schritte?: Anleitungsschritt[];
}

export type Anleitungsschritt = {
    id: number;
    title: string;
    description: string;
    image?: string;
    material?: string;
    anleitung_id: number;
}


export type User = { 
    id: string;
    name: string;
    email: string;
    password: string;
}
