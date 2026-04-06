import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSessionUser } from '@/lib/auth';
import { BOOK_LIST } from '@/lib/constants';
import Link from 'next/link';
import PageContent from './pagecontent';
import { makeUsersRequest, makeVersesRequest } from '@/lib/requests';
import { ParallelTranslationResponse, Verse } from '@/lib/types';
import { cookies } from 'next/headers';
import ScrollProgress from '@/components/ScrollProgress';

export type ParallelVerses = {
  translation: string;
  verses: Verse[];
};

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ translation: string; book: string; chapter: string }>;
}) {
  const { translation, book, chapter } = await params;
  const chapterNumber = Number(chapter);
  if (isNaN(chapterNumber)) {
    return (
      <div>
        章节 {chapter} 无效。点击
        <Link href={`/${translation}/${book}`}> 此处</Link>返回。
      </div>
    );
  }
  const actualBook = BOOK_LIST.find(
    (b) => b.book.replaceAll(' ', '-') === book,
  );
  if (!actualBook || actualBook.chapters < chapterNumber || chapterNumber < 1) {
    return (
      <div>
        章节号 {chapter} 无效。点击
        <Link href={`/${translation}/${book}`}> 此处</Link>返回。
      </div>
    );
  }
  const user = await getSessionUser();
  const regionalBookList = await makeVersesRequest(
    `/${translation}/books`,
    'GET',
  );
  let parallelTranslations: ParallelTranslationResponse;
  const verses: Verse[] = await makeVersesRequest(
    `/verses?tr=${translation.toUpperCase()}&ab=${actualBook.abbreviation}&ch=${chapterNumber}`,
    'GET',
  );
  let fontSize = 0;
  let fontFamily = 0;
  let marginSize = 0;
  if (user) {
    fontSize = user.preference.font_size;
    parallelTranslations = await makeUsersRequest(
      `/paralleltranslations/${translation}`,
      'GET',
    );
    fontFamily = user.preference.font_family;
    marginSize = user.preference.margin_size;
  } else {
    const cookieStore = await cookies();
    fontSize = Number(cookieStore.get('font_size')?.value) || 0;
    fontFamily = Number(cookieStore.get('font_family')?.value) || 0;
    marginSize = Number(cookieStore.get('margin_size')?.value) || 0;
    const parallelTranslationsCookie = cookieStore.get('parallel_translations');
    if (parallelTranslationsCookie) {
      try {
        const allParallelTranslations = JSON.parse(
          parallelTranslationsCookie.value,
        ) as Record<string, string[]>;

        parallelTranslations = allParallelTranslations[translation]
          ? {
              source_translation: translation,
              parallel_translations: allParallelTranslations[translation],
            }
          : {
              source_translation: translation,
              parallel_translations: [],
            };

        /*
          The cookie essentially has to look like this. 
          {
                  "KJV": ["TOVBSI", "WEB"],
                  "TOVBSI": ["ASV", "MLSVP"]
          }
      */
      } catch {
        console.error('Cannot parse parallel_translations cookie');
        parallelTranslations = {
          source_translation: translation,
          parallel_translations: [],
        };
      }
    } else {
      parallelTranslations = {
        source_translation: translation,
        parallel_translations: [],
      };
    }
  }
  const parallelVerses: ParallelVerses[] = await Promise.all(
    parallelTranslations.parallel_translations.map(async (t) => ({
      translation: t,
      verses: await makeVersesRequest(
        `/verses?tr=${t}&book=${verses[0].book}&chapter=${verses[0].chapter}`,
        'GET',
      ),
    })),
  );
  return (
    <div className="flex flex-col min-h-screen justify-between wrap-break-word">
      <ScrollProgress />
      <Header
        user={user}
        headerMidNavProps={{
          translation: translation,
          book: book.replaceAll('-', ' '),
          bookName: verses[0].book_name,
          chapter: chapterNumber,
          verseCount: verses.length,
          fontPref: fontFamily,
        }}
        parallelButtonProps={parallelTranslations}
        translation={translation}
        regionalNames={regionalBookList}
      />
      <div className="flex-grow">
        <PageContent
          verses={verses}
          translation={translation}
          parallelVerses={parallelVerses}
          fontSize={fontSize}
          fontFamily={fontFamily}
          marginSize={marginSize}
          parallelTranslations={parallelTranslations}
        />
      </div>
      <Footer />
    </div>
  );
}
