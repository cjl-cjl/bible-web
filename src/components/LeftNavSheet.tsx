'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  availableEnglishTranslations,
  BOOK_LIST,
  getLanguage,
} from '@/lib/constants';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { Menu } from 'lucide-react';
import { BibleBook, BibleBookConstant, User } from '@/lib/types';
import { switchUseAbbreviationState } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFont } from '@/lib/fonts';
import { Separator } from './ui/separator';
import { HeaderMidNavProps } from '@/components/HeaderMidNav';
import { TranslationMenu } from '@/components/TranslationMenu';
import AbbreviationButton from './AbbreviationButton';
const oldTestament = BOOK_LIST.slice(0, 39);
const newTestament = BOOK_LIST.slice(39);

export default function LeftNavSheet({
  regionalBookList,
  user,
  translation,
  headerMidNavProps,
}: {
  regionalBookList?: BibleBook[];
  user: User | null;
  translation?: string;
  headerMidNavProps?: HeaderMidNavProps;
}) {
  if (!translation || availableEnglishTranslations.includes(translation)) {
    regionalBookList = undefined;
  }
  let navLink = '/';
  if (translation) {
    navLink += translation;
  } else if (user) {
    if (user.preference.preferred_translation) {
      navLink += user.preference.preferred_translation;
    } else {
      navLink += 'KJV';
    }
  } else {
    navLink += 'KJV';
  }
  navLink += '/';
  const actualTranslation = navLink.slice(1, -1);

  const renderBookItem = (book: BibleBookConstant, i1: number) => {
    const actualLink = navLink + book.book.replaceAll(' ', '-');
    return (
      <div key={book.book}>
        <Separator />
        <Button
          asChild
          variant="ghost"
          className="flex w-full flex-col items-start h-10 px-4 py-2 text-left h-10"
        >
          <Link
            href={actualLink}
            className={cn(regionalBookList && 'py-7 md:py-8')}
          >
            {regionalBookList ? (
              <div className="flex flex-col p-2">
                <span
                  className={cn(
                    'text-base sm:text-[1.07rem]',
                    getFont(getLanguage(translation ?? 'KJV') ?? 'English').sans
                      .className,
                  )}
                >
                  {regionalBookList[i1].book_name}
                </span>
                <span
                  className={cn(
                    'text-sm sm:text-base text-muted-foreground',
                    getFont('English').sans.className,
                  )}
                >
                  {book.book}
                </span>
              </div>
            ) : (
              <span className="p-2 text-base sm:text-[1.07rem]">
                {book.book}
              </span>
            )}
          </Link>
        </Button>
      </div>
    );
  };
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Menu className="h-10 w-10 hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-xl md:text-2xl font-bold">
            <div className="grid grid-cols-2">
              <Link href="/">The Bible</Link>
              {(headerMidNavProps || translation) && (
                <TranslationMenu
                  translation={headerMidNavProps?.translation ?? translation!}
                />
              )}
            </div>
          </SheetTitle>
          {user && (
            <div className="mt-3 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <Label
                  className="text-muted-foreground hover:cursor-pointer"
                  htmlFor="use-abbreviations"
                >
                  Use abbreviations
                </Label>
                <Switch
                  className="hover:cursor-pointer"
                  checked={user?.preference.use_abrbeviations_for_nav}
                  onCheckedChange={switchUseAbbreviationState}
                  id="use-abbreviations"
                />
              </div>
            </div>
          )}
        </SheetHeader>
        {user?.preference?.use_abrbeviations_for_nav ? (
          <ScrollArea className="h-[calc(100vh-180px)] pr-4 py-4">
            <div className="space-y-8">
              <section>
                <h3 className="mb-2 px-4 font-bold text-muted-foreground text-base sm:text-lg md:text-lg">
                  Old Testament
                </h3>
                <div className="grid grid-cols-4 gap-4 mx-2 ml-4">
                  {oldTestament.map((book, i1) => (
                    <AbbreviationButton
                      key={i1}
                      book={book}
                      translation={actualTranslation}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-2 px-4 font-bold text-muted-foreground text-base sm:text-lg md:text-lg">
                  New Testament
                </h3>
                <div className="grid grid-cols-4 gap-4 mx-2 ml-4">
                  {newTestament.map((book, i2) => (
                    <AbbreviationButton
                      key={i2 + 39}
                      book={book}
                      translation={actualTranslation}
                    />
                  ))}
                </div>
              </section>
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className="h-[calc(100vh-180px)] pr-4 pt-4">
            <div className="space-y-8">
              <section>
                <h3 className="mb-2 px-4 font-bold text-muted-foreground text-base sm:text-lg md:text-lg">
                  {regionalBookList
                    ? regionalBookList[0].testament_name
                    : 'Old Testament'}
                </h3>
                <div className="grid grid-cols-1">
                  {oldTestament.map((book, i1) => renderBookItem(book, i1))}
                </div>
              </section>

              <section>
                <h3 className="mb-2 px-4 font-bold text-muted-foreground text-base sm:text-lg md:text-lg">
                  {regionalBookList
                    ? regionalBookList[65].testament_name
                    : 'New Testament'}
                </h3>
                <div className="grid grid-cols-1">
                  {newTestament.map((book, i2) =>
                    renderBookItem(book, i2 + 39),
                  )}
                </div>
              </section>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
