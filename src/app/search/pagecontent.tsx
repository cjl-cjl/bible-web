'use client';

import { BOOK_LIST, getLanguage } from '@/lib/constants';
import { getCopyTextSearch } from '@/lib/copy-logic';
import { getFont } from '@/lib/fonts';
import { Verse } from '@/lib/types';
import { useMediaQuery } from '@/lib/ui-utils';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { X, Copy } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import SettingsButtonGroup from '@/components/SettingsButtonGroup';
import DarkModeButton from '@/components/DarkModeButton';
import { getFontSizeClasses, getPageWidthClasses } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import SearchPageParallelButton from './SearchPageParallelButton';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

type PageContentProps = {
  query: string;
  translation: string;
  parallelTranslations: string[];
  fontFamily: number;
  fontSize: number;
  marginSize: number;
  verses: Verse[];
  parallelVerses: Array<{ [translation: string]: Verse[] }>;
  matchCase: boolean;
  wholeWords: boolean;
  abbreviation: string;
  books: string[] | undefined;
};

export default function PageContent({
  query,
  translation,
  parallelTranslations,
  fontFamily,
  fontSize,
  marginSize,
  verses,
  books,
  parallelVerses,
  matchCase,
  wholeWords,
}: PageContentProps) {
  const isDesktop = useMediaQuery(
    '(min-width: 768px) and (orientation: landscape)',
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([]);
  const [referenceAfterVerse, setReferenceAfterVerse] = useState(false);
  const [includeSearchLink, setIncludeSearchLink] = useState(false);
  const [fullSelected, setFullSelected] = useState(false);
  const [dontIncludeTranslationName, setDontIncludeTranslationName] =
    useState(false);

  const handleDoubleClick = (verse: Verse | undefined) => {
    if (drawerOpen || !verse) {
      return;
    }
    let updated;
    setSelectedVerses((prev) => {
      if (selectedVerses.some((sv) => sv === verse)) {
        updated = prev.filter((v) => v !== verse);
      } else {
        updated = [...prev, verse];
      }
      if (updated.length === 0) {
        setDrawerOpen(false);
      } else {
        setDrawerOpen(true);
      }
      setFullSelected(false);
      return updated;
    });
  };

  const handleSingleClick = (verse: Verse | undefined) => {
    if (!drawerOpen || !verse) {
      return;
    }
    let updated;
    setSelectedVerses((prev) => {
      if (selectedVerses.some((sv) => sv === verse)) {
        updated = prev.filter((v) => v !== verse);
      } else {
        updated = [...prev, verse];
      }
      if (updated.length === 0) {
        setDrawerOpen(false);
      } else {
        setDrawerOpen(true);
      }
      setFullSelected(false);
      return updated;
    });
  };

  const handleClearArray = () => {
    setSelectedVerses([]);
    setDrawerOpen(false);
    setFullSelected(false);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryForUrl = searchParams.toString();
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}${queryForUrl ? `?${queryForUrl}` : ''}`;

  const copyVerses = () => {
    const copyText = getCopyTextSearch(
      query,
      selectedVerses,
      [translation, ...parallelTranslations],
      currentUrl,
      includeSearchLink,
      referenceAfterVerse,
      fullSelected,
      dontIncludeTranslationName,
    );
    navigator.clipboard.writeText(copyText);
    toast.success('已复制');
    handleClearArray();
  };
  const languages = [
    getLanguage(translation) ?? 'English',
    ...(parallelTranslations ?? []).map(getLanguage),
  ];
  const fontClassNames = [
    ...new Set(
      languages.map((lang) => {
        const { sans, serif } = getFont(lang ?? 'English');
        return fontFamily === 1 ? serif.className : sans.className;
      }),
    ),
  ];

  function addAllVersesToCopyDrawer() {
    let allTranslations = [translation, ...parallelTranslations];
    let allVerses = [
      ...verses,
      ...parallelVerses.flatMap((obj) => Object.values(obj)[0]),
    ];
    const bookOrder = Object.fromEntries(BOOK_LIST.map((b, i) => [b.book, i]));
    allVerses.sort((a, b) => {
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
    setSelectedVerses(allVerses);
    setDrawerOpen(true);
    setFullSelected(true);
  }

  const displayParallel = parallelTranslations.length !== 0;
  return (
    <div>
      <Drawer
        modal={false}
        open={drawerOpen}
        direction={isDesktop ? 'right' : 'bottom'}
      >
        <DrawerContent className="data-[vaul-drawer-direction=right]:w-68 xl:data-[vaul-drawer-direction=right]:w-96 data-[vaul-drawer-direction=bottom]:max-h-128">
          <DrawerHeader>
            <div className="flex justify-between">
              <DrawerTitle>复制抽屉</DrawerTitle>
              <DrawerClose>
                <X
                  className="hover:cursor-pointer"
                  onClick={handleClearArray}
                ></X>
              </DrawerClose>
            </div>
            <DrawerDescription>
              将经文添加到此抽屉以复制
            </DrawerDescription>
          </DrawerHeader>
          <ul className="px-8 list-disc overflow-y-auto">
            {selectedVerses.map((verse, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
                  <span>
                    {verse.book} {verse.chapter}:{verse.verse_number} (
                    {verse.translation})
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-5 w-5 rounded-full text-muted-foreground hover:cursor-pointer"
                    onClick={() => handleSingleClick(verse)}
                  >
                    −
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="my-4 flex flex-col space-y-2 text-muted-foreground px-4">
            <div className="flex items-center space-x-2">
              <Switch
                className="hover:cursor-pointer"
                checked={referenceAfterVerse}
                onCheckedChange={setReferenceAfterVerse}
                id="referenceAfterVerse"
              ></Switch>
              <Label htmlFor="referenceAfterVerse">经文后附参考</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                className="hover:cursor-pointer"
                checked={dontIncludeTranslationName}
                onCheckedChange={setDontIncludeTranslationName}
                id="dontIncludeTranslationName"
              ></Switch>
              <Label htmlFor="dontIncludeTranslationName">
                {'不包含译本名称'}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                className="hover:cursor-pointer"
                checked={includeSearchLink}
                onCheckedChange={setIncludeSearchLink}
                id="includeSearchLink"
              ></Switch>
              <Label htmlFor="includeSearchLink">包含搜索链接</Label>
            </div>
          </div>
          <Button className="hover:cursor-pointer mx-4" onClick={copyVerses}>
            复制
          </Button>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="sm:w-[640px] lg:w-[800px] xl:w-[900px] 2xl:w-[1200px] mx-auto flex justify-end p-2 py-6 gap-2 mx-2">
        <Button
          variant="outline"
          className="hover:cursor-pointer"
          onClick={addAllVersesToCopyDrawer}
        >
          <Copy />
        </Button>
        <SearchPageParallelButton
          translation={translation}
          parallelTranslations={parallelTranslations}
          matchCase={matchCase}
          wholeWords={wholeWords}
          query={query}
          books={books?.join(',')}
        />
        <SettingsButtonGroup
          fontFamily={fontFamily}
          fontSize={fontSize}
          marginSize={marginSize}
        ></SettingsButtonGroup>
        <DarkModeButton></DarkModeButton>
      </div>
      <div
        className={cn(
          'mx-auto p-2 sm:p-0',
          getPageWidthClasses(marginSize),
          getFontSizeClasses(fontSize),
        )}
      >
        <h2 className="text-xl mb-4">
          <span className="font-bold">搜索结果</span>
          <span className="text-muted-foreground">
            {' '}
            ({verses.length} 节经文)
          </span>
        </h2>
        <Separator />
        <div className="my-4 text-lg space-y-2">
          <div>
            <span className="font-semibold">搜索词:</span> {query}
          </div>

          <div>
            <span className="font-semibold">译本:</span> {translation}
          </div>

          {parallelTranslations?.length > 0 && (
            <div>
              <span className="font-semibold">平行译本:</span>{' '}
              {parallelTranslations.join(', ')}
            </div>
          )}

          {books && books.length > 0 && books.length < 66 && (
            <div>
              <span className="font-semibold">书卷:</span> {books.join(', ')}
            </div>
          )}
        </div>
        <Separator />
        <div className={cn(fontClassNames, 'my-8')}>
          <h2 className="text-xl font-bold my-4">匹配的经文</h2>
          <ul className="list-disc pl-5">
            {verses.map((verse, index) => {
              const parts = verse.verse.split(new RegExp(`(${query})`, 'gi'));
              const isSelected = selectedVerses.some((sv) => sv === verse);
              return (
                <div className="my-3" key={index}>
                  <li
                    onClick={() => handleSingleClick(verse)}
                    onDoubleClick={() => handleDoubleClick(verse)}
                  >
                    {parts.map((part, i) =>
                      part.toLowerCase() === query.toLowerCase() ? (
                        <span
                          key={i}
                          className={cn(
                            isSelected &&
                              'underline underline-offset-4 decoration-dotted',
                          )}
                        >
                          <strong key={i}>{part}</strong>
                        </span>
                      ) : (
                        <span
                          key={i}
                          className={cn(
                            isSelected &&
                              'underline underline-offset-4 decoration-dotted',
                          )}
                        >
                          {part}
                        </span>
                      ),
                    )}{' '}
                    -{' '}
                    <Link
                      href={`/${translation}/${verse.book.replaceAll(' ', '-')}/${verse.chapter}#${verse.verse_number}`}
                    >
                      <span className="underline text-blue-600">
                        {verse.book_name} {verse.chapter}:{verse.verse_number}
                      </span>
                      {displayParallel && (
                        <sup className="text-muted-foreground">
                          {' '}
                          ({translation})
                        </sup>
                      )}
                    </Link>
                  </li>
                  <ul className="list-[circle]">
                    {displayParallel &&
                      parallelTranslations.map((tr, idx) => {
                        const currentParalellVerses = parallelVerses.find(
                          (item) => item[tr],
                        )?.[tr];

                        const currentParalellVerse =
                          currentParalellVerses?.[index];
                        const isSelected2 = selectedVerses.some(
                          (sv) => sv === currentParalellVerse,
                        );
                        const parts2 = currentParalellVerse?.verse.split(
                          new RegExp(`(${query})`, 'gi'),
                        );

                        return (
                          <li
                            key={idx}
                            onClick={() =>
                              handleSingleClick(currentParalellVerse)
                            }
                            onDoubleClick={() =>
                              handleDoubleClick(currentParalellVerse)
                            }
                          >
                            {parts2?.map((part2, i2) =>
                              part2.toLowerCase() === query.toLowerCase() ? (
                                <span
                                  key={i2}
                                  className={cn(
                                    isSelected2 &&
                                      'underline underline-offset-4 decoration-dotted',
                                  )}
                                >
                                  <strong>{part2}</strong>
                                </span>
                              ) : (
                                <span
                                  key={i2}
                                  className={cn(
                                    isSelected2 &&
                                      'underline underline-offset-4 decoration-dotted',
                                  )}
                                >
                                  {part2}
                                </span>
                              ),
                            )}{' '}
                            -{' '}
                            <Link
                              href={`/${tr}/${verse.book.replaceAll(
                                ' ',
                                '-',
                              )}/${verse.chapter}#${verse.verse_number}`}
                            >
                              <span className="underline text-blue-600">
                                {currentParalellVerse?.book_name}{' '}
                                {verse.chapter}:{verse.verse_number}{' '}
                              </span>
                              <sup className="text-muted-foreground">
                                ({tr})
                              </sup>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>
        {!isDesktop && drawerOpen && <div className="h-128"></div>}
      </div>
    </div>
  );
}
