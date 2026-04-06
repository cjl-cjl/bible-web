import Header from '@/components/Header';
import { getSessionUser } from '@/lib/auth';
import PageContent from './pagecontent';
import Footer from '@/components/Footer';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const user = await getSessionUser();
  if (!user) {
    return redirect(`/login?redirect=${encodeURIComponent('/settings')}`);
  }
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header user={user}></Header>
      <PageContent user={user} />
      <Footer></Footer>
    </div>
  );
}
