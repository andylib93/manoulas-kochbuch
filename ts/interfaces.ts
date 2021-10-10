interface Rezept {
    id: number;
    gericht: string;
    kueche: string;
    gang: string;
    zutaten: Array<Zutat>;
    zubereitung: string;
}

interface Zutat {
    id: number;
    menge: string;
    zutat: string;
    foreign_key: number;
}

export { Rezept, Zutat }
