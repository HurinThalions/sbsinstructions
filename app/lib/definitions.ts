export type Anleitung = {
    id: number;
    titel: string;
    dauer: string;
    datum: string;
    bild: string;
}

export type AnleitungKatalog = {
    id: number;
    anleitung_id: number;
    titel: string;
    dauer: string;
    datum: string;
    bild: string;
}

export type AnleitungForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid';
  };
  