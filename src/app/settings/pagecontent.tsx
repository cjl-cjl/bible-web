import { User } from '@/lib/types';
import { SettingsForm } from './form';

export default function PageContent({ user }: { user: User }) {
  return (
    <div className="flex-grow p-6 space-y-6 mx-auto w-screen md:w-[640px] lg:w-[820px] xl:w-[950px] 2xl:w-[1200px]">
      <h1 className="text-2xl font-bold">Settings</h1>
      <SettingsForm user={user}></SettingsForm>
    </div>
  );
}
