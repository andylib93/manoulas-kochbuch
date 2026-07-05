export interface Cuisine {
  code: string;
  label: string;
  flag: string;
}

export const CUISINES: Cuisine[] = [
  { code: 'AT', label: 'Österreichisch', flag: '🇦🇹' },
  { code: 'CH', label: 'Schweizer',      flag: '🇨🇭' },
  { code: 'CN', label: 'Chinesisch',     flag: '🇨🇳' },
  { code: 'DE', label: 'Deutsch',        flag: '🇩🇪' },
  { code: 'ES', label: 'Spanisch',       flag: '🇪🇸' },
  { code: 'FR', label: 'Französisch',    flag: '🇫🇷' },
  { code: 'GB', label: 'Britisch',       flag: '🇬🇧' },
  { code: 'GR', label: 'Griechisch',     flag: '🇬🇷' },
  { code: 'IN', label: 'Indisch',        flag: '🇮🇳' },
  { code: 'IT', label: 'Italienisch',    flag: '🇮🇹' },
  { code: 'LB', label: 'Libanesisch',    flag: '🇱🇧' },
  { code: 'MX', label: 'Mexikanisch',    flag: '🇲🇽' },
  { code: 'NL', label: 'Niederländisch', flag: '🇳🇱' },
  { code: 'PT', label: 'Portugiesisch',  flag: '🇵🇹' },
  { code: 'RS', label: 'Serbisch',       flag: '🇷🇸' },
  { code: 'TH', label: 'Thailändisch',   flag: '🇹🇭' },
  { code: 'TR', label: 'Türkisch',       flag: '🇹🇷' },
  { code: 'US', label: 'Amerikanisch',   flag: '🇺🇸' },
];

const FLAG_MAP = new Map(CUISINES.map(c => [c.code, c.flag]));

/** Gibt das Flag-Emoji zurück – auf Windows (keine Länder-Emojis) den Code als Fallback. */
const isWindows = typeof navigator !== 'undefined' &&
  (navigator.userAgent.includes('Windows') || navigator.platform?.startsWith('Win'));

export function flagOrCode(code: string | undefined | null): string {
  if (!code) return '';
  if (isWindows) return code;
  return FLAG_MAP.get(code.toUpperCase()) ?? code;
}

export function cuisineLabel(code: string | undefined | null): string {
  if (!code) return '';
  return CUISINES.find(c => c.code === code.toUpperCase())?.label ?? code;
}
