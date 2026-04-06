import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BibleBookConstant, BibleReference } from './types';
import { BOOK_LIST } from './constants';

interface CookieOptions {
  path: string;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  maxAge?: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getJoinedUrls(urls: Array<string>): string {
  return urls
    .filter(Boolean) // Remove empty or undefined parts
    .map((part, index) => {
      if (index === 0) {
        // Only trim trailing slashes on the first part (base URL)
        return part.replace(/\/+$/, '');
      }
      // For other parts, trim leading and trailing slashes
      return part.replace(/^\/+|\/+$/g, '');
    })
    .join('/');
}

export const getCookieOptions = (remember: boolean): CookieOptions => {
  const isProd = process.env.NODE_ENV === 'production';

  const baseOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd, // only secure in production
  } as const;

  if (remember) {
    return {
      ...baseOptions,
      maxAge: 30 * 24 * 60 * 60,
    };
  } else {
    return baseOptions;
  }
};

export const getBibleReferenceForUrl = (
  input: string,
): BibleReference | null => {
  const abbreviation = input.substring(0, 3).toUpperCase();
  const book = BOOK_LIST.find((b) => b.abbreviation === abbreviation);
  if (!book) {
    return null;
  }
  const bibleRef: BibleReference = {
    book: book.book,
    chapter: null,
    verse: null,
  };
  const restOfString = decodeURIComponent(input.substring(3)).substring(1);
  let arr: Array<string>;
  if (restOfString.includes(':')) {
    arr = restOfString.split(':');
  } else if (restOfString.includes('-')) {
    arr = restOfString.split('-');
  } else {
    const chapterNum = Number(restOfString);
    if (
      Number.isInteger(chapterNum) &&
      chapterNum > 0 &&
      chapterNum <= book.chapters
    ) {
      bibleRef.chapter = chapterNum;
    }
    return bibleRef;
  }
  // There should be atleast two elements in arr now
  const chapter = Number(arr[0]);
  const verse = Number(arr[1]);
  if (Number.isInteger(chapter) && chapter > 0 && chapter <= book.chapters) {
    bibleRef.chapter = chapter;
  }
  if (Number.isInteger(verse)) {
    bibleRef.verse = verse;
  }
  return bibleRef;
};

type NavPrevNext = {
  book?: string;
  chapter?: number;
};

export function getPrevNext(book: string, chapter?: number) {
  const idx = BOOK_LIST.findIndex((b) => b.book === book); // returns -1 if not found
  if (idx === -1) {
    return null;
  }
  const currentBook: BibleBookConstant = BOOK_LIST[idx];
  let next: NavPrevNext | null;
  let prev: NavPrevNext | null;

  const isOnlyBook = !chapter || chapter === 0;

  // Only book case - used for navigation in book pages (what book comes next and before)
  if (isOnlyBook) {
    if (idx === 0) {
      prev = null;
      next = { book: BOOK_LIST[1].book };
    } else if (idx === 65) {
      next = null;
      prev = { book: BOOK_LIST[64].book };
    } else {
      next = { book: BOOK_LIST[idx + 1].book };
      prev = { book: BOOK_LIST[idx - 1].book };
    }
    return { prev, next };
  }

  if (chapter > currentBook.chapters) {
    return null;
  }

  if (idx === 0 && chapter === 1) {
    next = { book: BOOK_LIST[0].book, chapter: 2 };
    return { prev: null, next: next };
  }
  if (idx === 65 && chapter === currentBook.chapters) {
    prev = { book: BOOK_LIST[65].book, chapter: currentBook.chapters - 1 };
    return { prev: prev, next: null };
  }
  if (currentBook.chapters === 1) {
    prev = {
      book: BOOK_LIST[idx - 1].book,
      chapter: BOOK_LIST[idx - 1].chapters,
    };
    next = { book: BOOK_LIST[idx + 1].book, chapter: 1 };
    return { prev, next };
  }
  if (chapter === 1) {
    prev = {
      book: BOOK_LIST[idx - 1].book,
      chapter: BOOK_LIST[idx - 1].chapters,
    };
  } else {
    prev = { book: currentBook.book, chapter: chapter - 1 };
  }
  if (chapter === currentBook.chapters) {
    next = { book: BOOK_LIST[idx + 1].book, chapter: 1 };
  } else {
    next = { book: currentBook.book, chapter: chapter + 1 };
  }
  return { prev, next };
}
