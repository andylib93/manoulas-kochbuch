interface Rezept {
    id?: number;
    gericht: string;
    kueche: string;
    gang: string;
    zutaten: Zutat[];
    zubereitung: string;
}

interface Zutat {
    id?: number;
    menge: string;
    zutat: string;
    foreign_key?: number;
}

interface PaginatedRecipe {
    data: Rezept[];
    start: number;
    end: number;
}

export { Rezept, Zutat, PaginatedRecipe }
