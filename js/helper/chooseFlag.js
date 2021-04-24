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
    'AT' : '🇦🇹'
}

const chooseFlag = countryCode => countryToFlags[countryCode]

export default chooseFlag
