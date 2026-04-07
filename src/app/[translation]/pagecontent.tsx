import BookButton from './BookButton';
import AbbreviationButton from '@/components/AbbreviationButton';
import { Button } from '@/components/ui/button';
import {
  BibleBook,
  BibleBookConstant,
  TranslationInfo,
  User,
} from '@/lib/types';
import Link from 'next/link';
import { BOOK_LIST } from '@/lib/constants';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { switchUseAbbreviationState } from '@/lib/actions';
import { cookies } from 'next/headers';

type PageContent = {
  currentTranslation: string;
  user: User | null;
  books: BibleBook[];
  translationInfo: TranslationInfo;
};

async function ActualNav({
  currentTranslation,
  user,
  books,
  translationInfo,
}: PageContent) {
  let use_abbreviations_for_nav = user?.preference.use_abrbeviations_for_nav;
  if (!user) {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get('use_abbreviations_for_nav')?.value;
    if (cookieValue !== undefined) {
      use_abbreviations_for_nav = cookieValue === 'true';
    }
  }
  return (
    <>
      <div className="my-4 sm:my-6 w-full flex items-center justify-center">
        <Button variant="outline" asChild className="font-bold text-lg">
          <Link href="/">
            {translationInfo.language === 'English'
              ? translationInfo.full_name
              : translationInfo.regional_name}
          </Link>
        </Button>
      </div>
      <div className="flex mb-2 items-center justify-end p-2">
        <div className="flex items-center space-x-2">
          <Label
            className="text-muted-foreground  hover:cursor-pointer"
            htmlFor="use-abbreviations"
          >
            使用缩写
          </Label>
          <Switch
            className="hover:cursor-pointer"
            checked={use_abbreviations_for_nav}
            onCheckedChange={switchUseAbbreviationState}
            id="use-abbreviations"
          />
        </div>
      </div>

      {use_abbreviations_for_nav ? (
        <AbbreviatedNav
          books={books}
          currentTranslation={currentTranslation}
        ></AbbreviatedNav>
      ) : (
        <FullNav
          books={books}
          currentTranslation={currentTranslation}
        ></FullNav>
      )}
    </>
  );
}

const AbbreviatedNavList = ({
  OT,
  currentTranslation,
}: {
  OT: boolean;
  currentTranslation: string;
}) => {
  const books = OT ? BOOK_LIST.slice(0, 39) : BOOK_LIST.slice(39);
  return (
    <div className="mx-auto grid grid-cols-5 md:grid-cols-4 gap-2 my-4 w-7/8 md:w-full">
      {books.map((item: BibleBookConstant, index: number) => (
        <AbbreviationButton
          key={index}
          book={item}
          translation={currentTranslation}
        />
      ))}
    </div>
  );
};

const AbbreviatedNav = ({
  books,
  currentTranslation,
}: {
  books: BibleBook[];
  currentTranslation: string;
}) => {
  return (
    <div className="w-full mx-auto md:w-2xl md:flex gap-2">
      <div className="w-full md:w-1/2">
        <h2 className="font-bold mb-2 text-center">
          {books[0].testament_name}
        </h2>
        <AbbreviatedNavList
          OT={true}
          currentTranslation={currentTranslation}
        ></AbbreviatedNavList>
      </div>
      <div className="hidden md:block w-12"></div>
      <div className="w-full md:w-1/2">
        <h2 className="font-bold mb-2 mt-4 md:mt-0 text-center">
          {books[65].testament_name}
        </h2>
        <AbbreviatedNavList
          OT={false}
          currentTranslation={currentTranslation}
        ></AbbreviatedNavList>
      </div>
    </div>
  );
};

const FullNav = ({
  books,
  currentTranslation,
}: {
  books: BibleBook[];
  currentTranslation: string;
}) => {
  return (
    <div className="w-full mx-auto md:w-2xl md:flex gap-2">
      <div className="w-full: md:w-1/2">
        <h2 className="font-bold mb-2 text-center">
          {books[0].testament_name}
        </h2>
        <div className="flex flex-col gap-2 p-2">
          {books.slice(0, 39).map((item: BibleBook, index: number) => (
            <BookButton
              key={index}
              book={item}
              translation={currentTranslation}
              numChapters={BOOK_LIST[index].chapters}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="font-bold mb-2 mt-4 md:mt-0 text-center">
          {books[65].testament_name}
        </h2>
        <div className="grid grid-col-1 gap-2 p-2 mx-auto">
          {books.slice(39).map((item: BibleBook, index: number) => (
            <BookButton
              key={index}
              book={item}
              translation={currentTranslation}
              numChapters={BOOK_LIST[index + 39].chapters}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PageContent = ({
  currentTranslation,
  user,
  books,
  translationInfo,
}: PageContent) => {
  return (
    <div className="my-4 max-w-2xl mx-auto px-4">
      <ActualNav
        user={user}
        currentTranslation={currentTranslation}
        books={books}
        translationInfo={translationInfo}
      />
    </div>
  );
};

export default PageContent;
