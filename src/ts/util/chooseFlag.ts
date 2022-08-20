// iban.com/country-codes

import { CountryToFlags } from "./interfaces";

const countryToFlags: CountryToFlags = {
    DE: "🇩🇪",
    GR: "🇬🇷",
    CN: "🇨🇳",
    ES: "🇪🇸",
    IT: "🇮🇹",
    US: "🇺🇸",
    PT: "🇵🇹",
    IN: "🇮🇳️",
    AT: "🇦🇹",
    TR: "🇹🇷",
    LB: "🇱🇧",
    GB: "🇬🇧",
    FR: "🇫🇷",
    TH: "🇹🇭",
    NL: "🇳🇱",
    MX: "🇲🇽",
    CH: "🇨🇭",
    RS: "🇷🇸"
};

const chooseFlag = (countryCode: keyof CountryToFlags) => countryToFlags[countryCode];

export default chooseFlag;
