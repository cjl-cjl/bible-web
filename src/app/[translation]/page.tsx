import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSessionUser } from '@/lib/auth';
import { availableTranslations } from '@/lib/constants';
import { getBibleReferenceForUrl } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PageContent from './pagecontent';
import ScrollProgress from '@/components/ScrollProgress';
import { makeVersesRequest } from '@/lib/requests';

export default async function TranslationPage({
  params,
}: {
  params: Promise<{ translation: string }>;
}) {
  const { translation } = await params;
  const user = await getSessionUser();
  const books = await makeVersesRequest(`/${translation}/books`, 'GET');
  const translationInfo = await makeVersesRequest(
    `/${translation}/info`,
    'GET',
  );

  // No problems, user directly requested available translation
  if (availableTranslations.includes(translation)) {
    return (
      <div className="flex flex-col min-h-screen justify-between">
        <ScrollProgress></ScrollProgress>
        <Header
          user={user}
          translation={translation}
          regionalNames={books}
          showLogo={true}
        />
        <div className="flex-grow">
          <PageContent
            user={user}
            currentTranslation={translation}
            books={books}
            translationInfo={translationInfo}
          />
        </div>
        <Footer />
      </div>
    );
  }
  // Only case mismatch, redirect to correct URL
  else if (availableTranslations.includes(translation.toUpperCase())) {
    redirect(`/${translation.toUpperCase()}`);
  }

  // Else
  else {
    let redirectUrl = '';
    if (user && user.preference.preferred_translation) {
      redirectUrl += `/${user.preference.preferred_translation}`;
    } else {
      redirectUrl += `/KJV`;
    }
    const ref = getBibleReferenceForUrl(translation);
    if (ref) {
      redirectUrl += `/${ref.book.replaceAll(' ', '-')}`;
      if (ref.chapter) {
        redirectUrl += `/${ref.chapter}`;
      }
      if (ref.verse) {
        redirectUrl += `#${ref.verse}`;
      }
      redirect(redirectUrl);
    }
  }
  return (
    <div>
      {translation} not available. Click <Link href="/">here</Link> to go back.
    </div>
  );
}
