import { Verse } from '@/lib/types';
import { BOOK_LIST } from './constants';

const superscriptMap: { [key: string]: string } = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

function toSuperscript(num: number) {
  return String(num)
    .split('')
    .map((digit) => superscriptMap[digit] || '')
    .join('');
}

function convertCommaToDash(input: string) {
  const numbers = input.split(',').map(Number);
  const condensedRanges = [];
  let startRange = numbers[0];
  let endRange = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === endRange + 1) {
      endRange = numbers[i];
    } else {
      if (startRange === endRange) {
        condensedRanges.push(startRange.toString());
      } else {
        condensedRanges.push(startRange + '-' + endRange);
      }
      startRange = numbers[i];
      endRange = numbers[i];
    }
  }

  if (startRange === endRange) {
    condensedRanges.push(startRange.toString());
  } else {
    condensedRanges.push(startRange + '-' + endRange);
  }
  condensedRanges.pop();
  return condensedRanges.join(',');
}

export function getCopyText(
  selectedVerses: Verse[],
  copyAsParagraph: boolean,
  includeLinkToSite: boolean,
  referenceAfterVerse: boolean,
  dontIncludeTranslationName: boolean,
  currentTranslation: string,
  currentBook: string,
  currentChapter: number,
) {
  // To add to url while copying.
  let firstVerseNumber = 0;
  const groupedVerses: Record<string, Verse[]> = selectedVerses.reduce(
    (accumulator: Record<string, Verse[]>, verse) => {
      const tra = verse.translation;
      if (!accumulator[tra]) {
        accumulator[tra] = [];
      }
      accumulator[tra].push(verse);
      return accumulator;
    },
    {},
  );
  for (const tra in groupedVerses) {
    groupedVerses[tra].sort(
      (a: Verse, b: Verse) => a.verse_number - b.verse_number,
    );
  }
  firstVerseNumber =
    groupedVerses[Object.keys(groupedVerses)[0]][0].verse_number;
  const chapterStrings: string[] = [];
  const chapterVerses: string[] = [];
  for (const tra in groupedVerses) {
    let currentChapterString = `${groupedVerses[tra][0].book_name} ${groupedVerses[tra][0].chapter}:`;
    let currentChapterVerse = '';
    for (let i = 0; i < groupedVerses[tra].length; i++) {
      currentChapterString += groupedVerses[tra][i].verse_number + ',';
      if (groupedVerses[tra].length > 1) {
        if (copyAsParagraph) {
          const superscriptNumber = toSuperscript(
            groupedVerses[tra][i].verse_number,
          );
          currentChapterVerse += `${superscriptNumber}${groupedVerses[tra][i].verse} `;
        } else {
          currentChapterVerse += `${groupedVerses[tra][i].verse_number}. ${groupedVerses[tra][i].verse}\n\n`;
        }
      } else {
        currentChapterVerse += `${groupedVerses[tra][i].verse}\n\n`;
      }
    }
    if (copyAsParagraph && groupedVerses[tra].length > 1) {
      currentChapterVerse += '\n\n';
    }
    let mantissa = convertCommaToDash(currentChapterString.split(':')[1]);
    if (dontIncludeTranslationName) {
    } else {
      mantissa = mantissa + ' ' + '(' + tra + ')';
    }

    currentChapterString = currentChapterString.split(':')[0] + ':' + mantissa;
    chapterStrings.push(currentChapterString);
    chapterVerses.push(currentChapterVerse);
  }

  let finalString = '';
  if (referenceAfterVerse) {
    for (let i = 0; i < chapterStrings.length; i++) {
      finalString += chapterVerses[i];
      finalString += chapterStrings[i];
      finalString += '\n\n';
    }
  } else {
    for (let i = 0; i < chapterStrings.length; i++) {
      finalString += chapterStrings[i];
      finalString += '\n\n';
      finalString += chapterVerses[i];
    }
  }

  if (includeLinkToSite) {
    finalString += `${process.env.NEXT_PUBLIC_SITE_URL}/${currentTranslation}/${currentBook}/${currentChapter}#${firstVerseNumber}\n\n`;
  }
  finalString = finalString.substring(0, finalString.length - 1);
  return finalString;
}

export function getCopyTextSearch(
  searchTerm: string,
  selectedVerses: Verse[],
  allTranslations: string[],
  link: string,
  includeSearchLink: boolean,
  referenceAfterVerse: boolean,
  fullSelected: boolean,
  dontIncludeTranslationName: boolean,
) {
  let includeTranslationName = !dontIncludeTranslationName;
  const bookOrder = Object.fromEntries(BOOK_LIST.map((b, i) => [b.book, i]));
  selectedVerses.sort((a, b) => {
    const bookDiff = bookOrder[a.book] - bookOrder[b.book];
    if (bookDiff !== 0) return bookDiff;

    const chapterDiff = a.chapter - b.chapter;
    if (chapterDiff !== 0) return chapterDiff;

    const verseDiff = a.verse_number - b.verse_number;
    if (verseDiff !== 0) return verseDiff;

    return (
      allTranslations.indexOf(a.translation) -
      allTranslations.indexOf(b.translation)
    );
  });
  let finalString = '';
  if (fullSelected) {
    finalString += `Search Term: ${searchTerm}`;
    if (dontIncludeTranslationName) {
      if (allTranslations.length == 1) {
        finalString += `, Translation: ${allTranslations[0]}`;
      } else {
        finalString += `, Translations: ${allTranslations.join(', ')}`;
      }
    }
    finalString += '\n\n';
    finalString += 'Verses: \n\n';
  }
  selectedVerses.map((verse) => {
    let reference = `${verse.book_name} ${verse.chapter}:${verse.verse_number}`;
    if (includeTranslationName) {
      reference += ` (${verse.translation})`;
    }
    reference += '\n';
    if (referenceAfterVerse) {
      finalString += `${verse.verse}\n`;
      finalString += `${reference}\n`;
    } else {
      finalString += reference;
      finalString += `${verse.verse}\n\n`;
    }
  });
  if (includeSearchLink) {
    finalString += `${link}\n\n`;
  }
  return finalString.slice(0, -1);
}
