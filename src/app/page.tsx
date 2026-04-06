import { getSessionUser } from '@/lib/auth';
import { makeVersesRequest } from '@/lib/requests';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContent from './pagecontent';
import type { AvailableTranslation } from '@/lib/types';
import ScrollProgress from '@/components/ScrollProgress';

export default async function Home() {
  const user = await getSessionUser();
  const availableTranslations: AvailableTranslation[] = await makeVersesRequest(
    '/translations',
    'GET',
  );
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <ScrollProgress></ScrollProgress>
      <Header user={user} />
      <div className="flex-grow">
        <PageContent availableTranslations={availableTranslations} />
      </div>
      <Footer />
    </div>
  );
}
