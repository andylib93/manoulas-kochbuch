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
    'UK' : '🇬🇧',
    'FR' : '🇫🇷',
    'TH' : '🇹🇭',
    'NL' : '🇳🇱'
}

const chooseFlag = countryCode => countryToFlags[countryCode]

export default chooseFlag
