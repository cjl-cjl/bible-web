import {
  Noto_Sans,
  Noto_Serif,
  Noto_Sans_Tamil,
  Noto_Serif_Tamil,
  Noto_Sans_Malayalam,
  Noto_Serif_Malayalam,
  Noto_Sans_Gujarati,
  Noto_Serif_Gujarati,
  Noto_Sans_Oriya,
  Noto_Serif_Oriya,
} from 'next/font/google';

const notoSansEnglish = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-english-sans',
});
const notoSerifEnglish = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-english-serif',
});
const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil-sans',
});
const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil-serif',
});
const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  variable: '--font-malayalam-sans',
});
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['malayalam'],
  variable: '--font-malayalam-serif',
});
const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-gujarati-sans',
});
const notoSerifGujarati = Noto_Serif_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-gujarati-serif',
});
const notoSansOdia = Noto_Sans_Oriya({
  subsets: ['oriya'],
  variable: '--font-odia-sans',
});
const notoSerifOdia = Noto_Serif_Oriya({
  subsets: ['oriya'],
  variable: '--font-odia-serif',
});

export const fonts = {
  English: { sans: notoSansEnglish, serif: notoSerifEnglish },
  Tamil: { sans: notoSansTamil, serif: notoSerifTamil },
  Malayalam: { sans: notoSansMalayalam, serif: notoSerifMalayalam },
  Gujarati: { sans: notoSansGujarati, serif: notoSerifGujarati },
  Odia: { sans: notoSansOdia, serif: notoSerifOdia },
} as const;

type LanguageKey = keyof typeof fonts;

export function getFont(lang: string) {
  return fonts[lang as LanguageKey] ?? fonts.English;
}

export function getPageWidthClasses(value: number): string {
  const map: Record<number, string> = {
    [-2]: 'max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%]',
    [-1]: 'max-w-[80%] sm:max-w-[70%] md:max-w-[65%] lg:max-w-[60%]',
    [0]: 'max-w-prose', // Tailwind’s nice readable width (~65ch)
    [1]: 'max-w-[60ch] sm:max-w-[55ch] md:max-w-[50ch]',
    [2]: 'max-w-[45ch] sm:max-w-[40ch] md:max-w-[35ch]',
  };
  return map[value] || map[0];
}

export function getFontSizeClasses(value: number): string {
  const map: Record<number, string> = {
    [-2]: 'text-xs leading-6 sm:text-sm sm:leading-7 md:text-sm md:leading-8',
    [-1]: 'text-sm leading-7 sm:text-base sm:leading-8 md:text-base md:leading-9',
    [0]: 'text-base leading-8 sm:text-lg sm:leading-9 md:text-lg md:leading-10',
    [1]: 'text-lg leading-9 sm:text-xl sm:leading-10 md:text-xl md:leading-11',
    [2]: 'text-xl leading-10 sm:text-2xl sm:leading-11 md:text-2xl md:leading-12',
  };

  return map[value] || map[0];
}
