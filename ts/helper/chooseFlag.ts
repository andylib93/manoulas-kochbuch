'use strict'

// iban.com/country-codes

const countryToFlags = {
    'DE' : '🇩🇪', 
    'GR' : '🇬🇷',
    'CN' : '🇨🇳',
    'ES' : '🇪🇸',
    'IT' : '🇮🇹',
    'US' : '🇺🇸',
    'PT' : '🇵🇹',
    'IN' : '🇮🇳️',
    'AT' : '🇦🇹',
    'TR' : '🇹🇷',
    'LB' : '🇱🇧',
    'GB' : '🇬🇧',
    'FR' : '🇫🇷',
    'TH' : '🇹🇭',
    'NL' : '🇳🇱',
    'MX' : '🇲🇽',
    'CH' : '🇨🇭'
}

const chooseFlag = countryCode => countryToFlags[countryCode]

export default chooseFlag
