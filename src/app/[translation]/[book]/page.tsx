import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSessionUser } from '@/lib/auth';
import PageContent from './pagecontent';
import { BOOK_LIST } from '@/lib/constants';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { makeVersesRequest } from '@/lib/requests';
import { cookies } from 'next/headers';
import ScrollProgress from '@/components/ScrollProgress';

export default async function BookPage({
  params,
}: {
  params: Promise<{ translation: string; book: string }>;
}) {
  const { translation, book } = await params;
  const abbreviationFind = BOOK_LIST.find(
    (b) => b.abbreviation === book.toUpperCase(),
  );
  if (abbreviationFind && book !== 'Job') {
    redirect(`/${translation}/${abbreviationFind.book.replaceAll(' ', '-')}`);
  }
  const actualBookName = book.replaceAll('-', ' ');
  const actualBookFind = BOOK_LIST.find((b) => b.book === actualBookName);
  if (!actualBookFind) {
    return (
      <div>
        The requested book {book} not found. Click{' '}
        <Link href={`/${translation}`}>here</Link> to go back.
      </div>
    );
  }
  const user = await getSessionUser();
  const bookNames = await makeVersesRequest(`/${translation}/books`, 'GET');
  const bookName: string = bookNames.find(
    (b: { book: string }) => b.book === actualBookName,
  ).book_name;

  let fontFamily = 0;
  if (user) {
    fontFamily = user.preference.font_family;
  } else {
    const cookieStore = await cookies();
    fontFamily = Number(cookieStore.get('font_family')?.value) || 0;
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <ScrollProgress></ScrollProgress>
      <Header
        user={user}
        headerMidNavProps={{
          translation,
          book: actualBookName,
          bookName,
          fontPref: fontFamily,
        }}
        translation={translation}
        regionalNames={bookNames}
      />
      <div className="flex-grow">
        <PageContent book={actualBookFind} translation={translation} />
      </div>
      <Footer />
    </div>
  );
}
