import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import { getSessionUser } from '@/lib/auth';
import { availableTranslations } from '@/lib/constants';
import { makeVersesRequest } from '@/lib/requests';
import PageContent from './pagecontent';
import { cookies } from 'next/headers';
import { Verse } from '@/lib/types';

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    translation?: string;
    abbreviation?: string;
    matchcase?: string;
    wholewords?: string;
    parallel?: string;
    books?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const user = await getSessionUser();
  const {
    query,
    translation,
    abbreviation,
    matchcase,
    wholewords,
    parallel,
    books,
  } = await searchParams;

  const matchCase = matchcase === 'true';
  const wholeWords = wholewords === 'true';
  const actualParallel = [
    ...new Set(
      parallel
        ?.split(',')
        .map((tr) => tr.toUpperCase())
        .filter(
          (tr) => tr !== translation && availableTranslations.includes(tr),
        ),
    ),
  ];
  const actualBooks = books?.split(',') ?? [];

  const searchVerses: Verse[] = await makeVersesRequest('/search', 'POST', {
    search_text: query,
    translation: translation,
    match_case: matchCase,
    whole_words: wholeWords,
    abbreviation: abbreviation,
    parallel_translations: actualParallel,
    books: actualBooks,
  });

  const verses = searchVerses.filter((v) => v.translation === translation);
  const parallelVerses = actualParallel.map((parallelTranslation) => {
    return {
      [parallelTranslation]: searchVerses.filter(
        (v) => v.translation === parallelTranslation,
      ),
    };
  });

  let fontSize = 0;
  let fontFamily = 0;
  let marginSize = 0;
  if (user) {
    fontSize = user.preference.font_size;
    fontFamily = user.preference.font_family;
    marginSize = user.preference.margin_size;
  } else {
    const cookieStore = await cookies();
    fontSize = Number(cookieStore.get('font_size')?.value) || 0;
    fontFamily = Number(cookieStore.get('font_family')?.value) || 0;
    marginSize = Number(cookieStore.get('margin_size')?.value) || 0;
  }
  return (
    <div className="flex flex-col min-h-screen justify-between wrap-break-word">
      <Header user={user} translation={translation}></Header>
      <ScrollProgress />
      <div className="flex-grow">
        <PageContent
          query={query || ''} // It's not empty (The UI restricts empy calls and also the API fails)
          translation={translation || 'KJV'}
          parallelTranslations={actualParallel}
          fontFamily={fontFamily}
          fontSize={fontSize}
          marginSize={marginSize}
          verses={verses}
          parallelVerses={parallelVerses}
          matchCase={matchCase}
          abbreviation={abbreviation || ''}
          wholeWords={wholeWords}
          books={actualBooks}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
