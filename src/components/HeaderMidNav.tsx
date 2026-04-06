import { getPrevNext } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BOOK_LIST, getLanguage } from '@/lib/constants';
import { getFont } from '@/lib/fonts';

export type HeaderMidNavProps = {
  translation: string;
  book: string;
  bookName?: string;
  chapter?: number;
  verseCount?: number;
  fontPref?: number;
};

type NavProps = {
  leftLink: string;
  navText: string;
  rightLink: string;
  translation: string;
  abbreviation?: string;
  chapter?: number;
  book?: string;
  bookName?: string;
  verseCount?: number;
  fontPref?: number;
};

function MidNavButton({
  leftLink,
  rightLink,
  translation,
  book,
  bookName,
  chapter,
  verseCount,
  fontPref,
}: NavProps) {
  const bookObj = BOOK_LIST.find((b) => b.book === book);
  if (!bookObj) {
    return <></>;
  }
  const currentLanguage: string = getLanguage(translation) ?? 'English';
  const { sans, serif } = getFont(currentLanguage);
  let fontClassVar;
  if (fontPref === 1) {
    fontClassVar = serif.className;
  } else {
    fontClassVar = sans.className;
  }

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 xl:gap-4">
      {leftLink ? (
        <Link href={leftLink} passHref>
          <Button
            variant="outline"
            className="hover:cursor-pointer h-10 xl:h-12"
          >
            <ArrowLeft />
          </Button>
        </Link>
      ) : (
        <div className="w-10"></div>
      )}

      <Button
        asChild
        className={`${fontClassVar} md:min-w-36 xl:min-w-48 h-10 xl:h-12 hover:cursor-pointer`}
      >
        {chapter ? (
          <Link href={`/${translation}/${book?.replaceAll(' ', '-')}`}>
            {bookName} - {chapter} ({verseCount})
          </Link>
        ) : (
          <Link href={`/${translation}/`}>{bookName}</Link>
        )}
      </Button>

      {rightLink ? (
        <Link href={rightLink} passHref>
          <Button
            variant="outline"
            className="hover:cursor-pointer h-10 xl:h-12"
          >
            <ArrowRight />
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function HeaderMidNav({
  translation,
  book,
  bookName,
  chapter,
  verseCount,
  fontPref,
}: HeaderMidNavProps) {
  const prevNext = getPrevNext(book.replaceAll('-', ' '), chapter);
  let leftLink = '';
  let rightLink = '';
  if (prevNext?.prev) {
    if (prevNext.prev.book) {
      leftLink = `/${translation}/${prevNext.prev.book.replaceAll(' ', '-')}`;
      if (prevNext.prev.chapter) {
        leftLink += `/${prevNext.prev.chapter}`;
      }
    }
  }
  if (prevNext?.next) {
    if (prevNext.next.book) {
      rightLink = `/${translation}/${prevNext.next.book.replaceAll(' ', '-')}`;
      if (prevNext.next.chapter) {
        rightLink += `/${prevNext.next.chapter}`;
      }
    }
  }
  const bookObject = BOOK_LIST.find((b) => b.book === book);
  let navText = book;
  if (chapter) {
    navText = navText + ' - ' + chapter.toString();
    if (verseCount) {
      navText = navText + ` (${verseCount})`;
    }
  }

  return (
    <div className="flex items-center justify-center">
      <MidNavButton
        leftLink={leftLink}
        rightLink={rightLink}
        navText={navText}
        translation={translation}
        abbreviation={bookObject?.abbreviation}
        chapter={chapter}
        book={book}
        bookName={bookName}
        verseCount={verseCount}
        fontPref={fontPref}
      />
    </div>
  );
}

export default HeaderMidNav;
