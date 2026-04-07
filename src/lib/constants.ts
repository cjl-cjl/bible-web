export const APP_NAME = '圣经';

export const OT_BOOK_COUNT = 39;
export const NT_BOOK_COUNT = 27;

export const availableTranslations = [
  'KJV',
  'ASV',
  'TOVBSI',
  'MLSVP',
  'WEB',
  'WEBU',
  'GOVBSI',
  'OOVBSI',
];

export const availableEnglishTranslations = ['KJV', 'ASV', 'WEB', 'WEBU'];

export const translationLanguageMap = {
  KJV: 'English',
  ASV: 'English',
  TOVBSI: 'Tamil',
  MLSVP: 'Malayalam',
  WEB: 'English',
  WEBU: 'English',
  GOVBSI: 'Gujarati',
  OOVBSI: 'Odia',
} as const;

export type TranslationCode = keyof typeof translationLanguageMap;
export type Language = (typeof translationLanguageMap)[TranslationCode];

export function getLanguage(code: string): string | undefined {
  return translationLanguageMap[code as keyof typeof translationLanguageMap];
}
export const BOOK_LIST = [
  {
    book: 'Genesis',
    abbreviation: 'GEN',
    chapters: 50,
    verses: 1533,
  },
  {
    book: 'Exodus',
    abbreviation: 'EXO',
    chapters: 40,
    verses: 1213,
  },
  {
    book: 'Leviticus',
    abbreviation: 'LEV',
    chapters: 27,
    verses: 859,
  },
  {
    book: 'Numbers',
    abbreviation: 'NUM',
    chapters: 36,
    verses: 1288,
  },
  {
    book: 'Deuteronomy',
    abbreviation: 'DEU',
    chapters: 34,
    verses: 959,
  },
  {
    book: 'Joshua',
    abbreviation: 'JOS',
    chapters: 24,
    verses: 658,
  },
  {
    book: 'Judges',
    abbreviation: 'JDG',
    chapters: 21,
    verses: 618,
  },
  {
    book: 'Ruth',
    abbreviation: 'RUT',
    chapters: 4,
    verses: 85,
  },
  {
    book: '1 Samuel',
    abbreviation: '1SA',
    chapters: 31,
    verses: 810,
  },
  {
    book: '2 Samuel',
    abbreviation: '2SA',
    chapters: 24,
    verses: 695,
  },
  {
    book: '1 Kings',
    abbreviation: '1KI',
    chapters: 22,
    verses: 816,
  },
  {
    book: '2 Kings',
    abbreviation: '2KI',
    chapters: 25,
    verses: 719,
  },
  {
    book: '1 Chronicles',
    abbreviation: '1CH',
    chapters: 29,
    verses: 942,
  },
  {
    book: '2 Chronicles',
    abbreviation: '2CH',
    chapters: 36,
    verses: 822,
  },
  {
    book: 'Ezra',
    abbreviation: 'EZR',
    chapters: 10,
    verses: 280,
  },
  {
    book: 'Nehemiah',
    abbreviation: 'NEH',
    chapters: 13,
    verses: 406,
  },
  {
    book: 'Esther',
    abbreviation: 'EST',
    chapters: 10,
    verses: 167,
  },
  {
    book: 'Job',
    abbreviation: 'JOB',
    chapters: 42,
    verses: 1070,
  },
  {
    book: 'Psalm',
    abbreviation: 'PSA',
    chapters: 150,
    verses: 2461,
  },
  {
    book: 'Proverbs',
    abbreviation: 'PRO',
    chapters: 31,
    verses: 915,
  },
  {
    book: 'Ecclesiastes',
    abbreviation: 'ECC',
    chapters: 12,
    verses: 222,
  },
  {
    book: 'Song of Solomon',
    abbreviation: 'SNG',
    chapters: 8,
    verses: 117,
  },
  {
    book: 'Isaiah',
    abbreviation: 'ISA',
    chapters: 66,
    verses: 1292,
  },
  {
    book: 'Jeremiah',
    abbreviation: 'JER',
    chapters: 52,
    verses: 1364,
  },
  {
    book: 'Lamentations',
    abbreviation: 'LAM',
    chapters: 5,
    verses: 154,
  },
  {
    book: 'Ezekiel',
    abbreviation: 'EZK',
    chapters: 48,
    verses: 1273,
  },
  {
    book: 'Daniel',
    abbreviation: 'DAN',
    chapters: 12,
    verses: 357,
  },
  {
    book: 'Hosea',
    abbreviation: 'HOS',
    chapters: 14,
    verses: 197,
  },
  {
    book: 'Joel',
    abbreviation: 'JOL',
    chapters: 3,
    verses: 73,
  },
  {
    book: 'Amos',
    abbreviation: 'AMO',
    chapters: 9,
    verses: 146,
  },
  {
    book: 'Obadiah',
    abbreviation: 'OBA',
    chapters: 1,
    verses: 21,
  },
  {
    book: 'Jonah',
    abbreviation: 'JON',
    chapters: 4,
    verses: 48,
  },
  {
    book: 'Micah',
    abbreviation: 'MIC',
    chapters: 7,
    verses: 105,
  },
  {
    book: 'Nahum',
    abbreviation: 'NAM',
    chapters: 3,
    verses: 47,
  },
  {
    book: 'Habakkuk',
    abbreviation: 'HAB',
    chapters: 3,
    verses: 56,
  },
  {
    book: 'Zephaniah',
    abbreviation: 'ZEP',
    chapters: 3,
    verses: 53,
  },
  {
    book: 'Haggai',
    abbreviation: 'HAG',
    chapters: 2,
    verses: 38,
  },
  {
    book: 'Zechariah',
    abbreviation: 'ZEC',
    chapters: 14,
    verses: 211,
  },
  {
    book: 'Malachi',
    abbreviation: 'MAL',
    chapters: 4,
    verses: 55,
  },
  {
    book: 'Matthew',
    abbreviation: 'MAT',
    chapters: 28,
    verses: 1071,
  },
  {
    book: 'Mark',
    abbreviation: 'MRK',
    chapters: 16,
    verses: 678,
  },
  {
    book: 'Luke',
    abbreviation: 'LUK',
    chapters: 24,
    verses: 1151,
  },
  {
    book: 'John',
    abbreviation: 'JHN',
    chapters: 21,
    verses: 879,
  },
  {
    book: 'Acts',
    abbreviation: 'ACT',
    chapters: 28,
    verses: 1007,
  },
  {
    book: 'Romans',
    abbreviation: 'ROM',
    chapters: 16,
    verses: 433,
  },
  {
    book: '1 Corinthians',
    abbreviation: '1CO',
    chapters: 16,
    verses: 437,
  },
  {
    book: '2 Corinthians',
    abbreviation: '2CO',
    chapters: 13,
    verses: 257,
  },
  {
    book: 'Galatians',
    abbreviation: 'GAL',
    chapters: 6,
    verses: 149,
  },
  {
    book: 'Ephesians',
    abbreviation: 'EPH',
    chapters: 6,
    verses: 155,
  },
  {
    book: 'Philippians',
    abbreviation: 'PHP',
    chapters: 4,
    verses: 104,
  },
  {
    book: 'Colossians',
    abbreviation: 'COL',
    chapters: 4,
    verses: 95,
  },
  {
    book: '1 Thessalonians',
    abbreviation: '1TH',
    chapters: 5,
    verses: 89,
  },
  {
    book: '2 Thessalonians',
    abbreviation: '2TH',
    chapters: 3,
    verses: 47,
  },
  {
    book: '1 Timothy',
    abbreviation: '1TI',
    chapters: 6,
    verses: 113,
  },
  {
    book: '2 Timothy',
    abbreviation: '2TI',
    chapters: 4,
    verses: 83,
  },
  {
    book: 'Titus',
    abbreviation: 'TIT',
    chapters: 3,
    verses: 46,
  },
  {
    book: 'Philemon',
    abbreviation: 'PHM',
    chapters: 1,
    verses: 25,
  },
  {
    book: 'Hebrews',
    abbreviation: 'HEB',
    chapters: 13,
    verses: 303,
  },
  {
    book: 'James',
    abbreviation: 'JAM',
    chapters: 5,
    verses: 108,
  },
  {
    book: '1 Peter',
    abbreviation: '1PE',
    chapters: 5,
    verses: 105,
  },
  {
    book: '2 Peter',
    abbreviation: '2PE',
    chapters: 3,
    verses: 61,
  },
  {
    book: '1 John',
    abbreviation: '1JN',
    chapters: 5,
    verses: 105,
  },
  {
    book: '2 John',
    abbreviation: '2JN',
    chapters: 1,
    verses: 13,
  },
  {
    book: '3 John',
    abbreviation: '3JN',
    chapters: 1,
    verses: 14,
  },
  {
    book: 'Jude',
    abbreviation: 'JUD',
    chapters: 1,
    verses: 25,
  },
  {
    book: 'Revelation',
    abbreviation: 'REV',
    chapters: 22,
    verses: 404,
  },
];
