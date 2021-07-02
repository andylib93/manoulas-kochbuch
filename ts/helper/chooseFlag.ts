'use strict'

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
    'NL' : '🇳🇱'
}

const chooseFlag = countryCode => countryToFlags[countryCode]

export default chooseFlag
