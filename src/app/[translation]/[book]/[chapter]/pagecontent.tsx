'use client';
import { ParallelTranslationResponse, Verse } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { ParallelVerses } from './page';
import SettingsButtonGroup from '@/components/SettingsButtonGroup';
import DarkModeButton from '@/components/DarkModeButton';
import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getCopyText } from '@/lib/copy-logic';
import { toast } from 'sonner';
import { getPageWidthClasses, getFontSizeClasses } from '@/lib/fonts';
import { Separator } from '@/components/ui/separator';
import { getLanguage } from '@/lib/constants';
import { getFont } from '@/lib/fonts';
import { useMediaQuery } from '@/lib/ui-utils';

type PageContentProps = {
  verses: Verse[];
  translation: string;
  parallelVerses: ParallelVerses[];
  fontSize: number;
  fontFamily: number;
  marginSize: number;
  parallelTranslations: ParallelTranslationResponse;
};

const PageContent = ({
  translation,
  verses,
  fontSize,
  fontFamily,
  marginSize,
  parallelVerses,
  parallelTranslations,
}: PageContentProps) => {
  const isDesktop = useMediaQuery(
    '(min-width: 768px) and (orientation: landscape)',
  );
  const showParallel = parallelTranslations.parallel_translations.length !== 0;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([]);
  const [copyAsParagraph, setCopyAsParagraph] = useState(false);
  const [includeLinkToSite, setIncludeLinkToSite] = useState(false);
  const [referenceAfterVerse, setReferenceAfterVerse] = useState(false);
  const [dontIncludeTranslationName, setDontIncludeTranslationName] =
    useState(false);

  const handleDoubleClick = (verse: Verse) => {
    if (drawerOpen) {
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
      return updated;
    });
  };

  const handleSingleClick = (verse: Verse) => {
    if (!drawerOpen) {
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
      return updated;
    });
  };

  const handleClearArray = () => {
    setSelectedVerses([]);
    setDrawerOpen(false);
  };

  const copyVerses = () => {
    const copyText = getCopyText(
      selectedVerses,
      copyAsParagraph,
      includeLinkToSite,
      referenceAfterVerse,
      dontIncludeTranslationName,
      verses[0].translation,
      verses[0].book.replaceAll(' ', '-'),
      verses[0].chapter,
    );
    navigator.clipboard.writeText(copyText);
    toast.success('Copied');
    handleClearArray();
  };
  const currentLanguage = getLanguage(translation) ?? 'English';
  const { sans, serif } = getFont(currentLanguage);
  let fontVar;
  if (fontFamily === 1) {
    fontVar = serif.className;
  } else {
    fontVar = sans.className;
  }
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
              <DrawerTitle>Copy Drawer</DrawerTitle>
              <DrawerClose>
                <X
                  className="hover:cursor-pointer"
                  onClick={handleClearArray}
                ></X>
              </DrawerClose>
            </div>
            <DrawerDescription>
              Add verses to this drawer to copy
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
                checked={copyAsParagraph}
                onCheckedChange={setCopyAsParagraph}
                id="copyAsParagraph"
              ></Switch>
              <Label htmlFor="copyAsParagraph">Copy verses as paragraphs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                className="hover:cursor-pointer"
                checked={includeLinkToSite}
                onCheckedChange={setIncludeLinkToSite}
                id="includeLinkToSite"
              ></Switch>
              <Label htmlFor="includeLinkToSite">
                Include link to this site
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                className="hover:cursor-pointer"
                checked={referenceAfterVerse}
                onCheckedChange={setReferenceAfterVerse}
                id="referenceAfterVerse"
              ></Switch>
              <Label htmlFor="referenceAfterVerse">Reference after verse</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                className="hover:cursor-pointer"
                checked={dontIncludeTranslationName}
                onCheckedChange={setDontIncludeTranslationName}
                id="dontIncludeTranslationName"
              ></Switch>
              <Label htmlFor="dontIncludeTranslationName">
                {"Don't include translation name"}
              </Label>
            </div>
          </div>
          <Button className="hover:cursor-pointer mx-4" onClick={copyVerses}>
            Copy
          </Button>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="sm:w-[640px] lg:w-[800px] xl:w-[900px] 2xl:w-[1200px] mx-auto flex justify-end p-2 gap-2 mx-2">
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
          fontVar,
        )}
      >
        <ol className="px-2 space-y-4">
          {verses.map((v, index) => {
            const isSelected = selectedVerses.some((sv) => sv === v);
            return (
              <li key={index} className="space-y-2">
                <div
                  onClick={() => handleSingleClick(v)}
                  onDoubleClick={() => handleDoubleClick(v)}
                  className="scroll-mt-36"
                  id={(index + 1).toString()}
                >
                  <span className="text-muted-foreground">
                    <sup>{v.verse_number} </sup>
                  </span>
                  <span
                    className={cn(
                      isSelected &&
                        'underline underline-offset-4 decoration-dotted',
                    )}
                  >
                    {v.verse}
                  </span>
                  {showParallel && (
                    <span className="text-muted-foreground">
                      <sup>{parallelTranslations.source_translation}</sup>
                    </span>
                  )}
                </div>

                {parallelVerses.map((pv) => {
                  const isSelected2 = selectedVerses.some(
                    (sv) => sv === pv.verses[index],
                  );
                  return (
                    <div
                      onClick={() => handleSingleClick(pv.verses[index])}
                      onDoubleClick={() => handleDoubleClick(pv.verses[index])}
                      key={pv.translation}
                    >
                      <span
                        className={cn(
                          isSelected2 &&
                            'underline underline-offset-4 decoration-dotted',
                        )}
                      >
                        {pv.verses[index]?.verse}
                      </span>
                      <span className="text-muted-foreground">
                        <sup>{pv.translation}</sup>
                      </span>
                    </div>
                  );
                })}
                {index !== verses.length - 1 && <Separator />}
              </li>
            );
          })}
        </ol>
        {!isDesktop && drawerOpen && <div className="h-128"></div>}
      </div>
    </div>
  );
};

export default PageContent;
