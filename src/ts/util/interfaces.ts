export interface Rezept {
    _id?: number;
    gericht: string;
    kueche: string;
    gang: string;
    zutaten: Zutat[];
    zubereitung: string;
}

export interface Zutat {
    _id?: number;
    menge: string;
    zutat: string;
    foreign_key?: number;
}

export interface PaginatedRecipe {
    data: Rezept[];
    start: number;
    end: number;
}

export interface CountryToFlags {
    DE: string; 
    GR: string;
    CN: string;
    ES: string;
    IT: string;
    US: string;
    PT: string;
    IN: string;
    AT: string;
    TR: string;
    LB: string;
    GB: string;
    FR: string;
    TH: string;
    NL: string;
    MX: string;
    CH: string;
    RS: string;
}

export interface OptionValue {
    value: string;
    fill: string;
}

export interface Message {
    message: string;
}
