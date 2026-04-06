'use client';

import { Separator } from '@/components/ui/separator';
import AvatarButton from '@/components/AvatarButton';
import SearchButton from '@/components/SearchButton';
import ParallelButton from '@/components/ParallelButton';
import SettingsButton from '@/components/SettingsButton';
import HeaderMidNav from '@/components/HeaderMidNav';

import type { HeaderMidNavProps } from './HeaderMidNav';
import type { BibleBook, ParallelTranslationResponse, User } from '@/lib/types';
import { useScrollTop } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import { APP_NAME } from '@/lib/constants';

import LeftNavSheet from '@/components/LeftNavSheet';
import Link from 'next/link';

type HeaderProps = {
  user: User | null;
  headerMidNavProps?: HeaderMidNavProps;
  parallelButtonProps?: ParallelTranslationResponse;
  translation?: string;
  regionalNames?: BibleBook[];
  showLogo?: boolean;
};

export default function Header({
  user,
  headerMidNavProps,
  parallelButtonProps,
  translation,
  regionalNames,
  showLogo,
}: HeaderProps) {
  const scrolled = useScrollTop();

  let link = '/';
  if (headerMidNavProps?.book) {
    link += headerMidNavProps.translation;
  }

  return (
    <div>
      <div
        className={cn(
          'z-50 bg-background fixed top-0 w-full h-16 flex flex-col items-center justify-between',
          scrolled && 'shadow-sm',
          headerMidNavProps && 'h-32 flex-col',
        )}
      >
        <div className="h-16 bg-background flex items-center justify-center">
          <div className="w-screen mx-auto">
            <div className="mx-2 md:mx-8 grid grid-cols-3">
              <div>
                {showLogo ? (
                  <Link className="font-bold text-2xl" href="/">
                    {APP_NAME}
                  </Link>
                ) : (
                  <LeftNavSheet
                    translation={translation}
                    user={user}
                    regionalBookList={regionalNames}
                    headerMidNavProps={headerMidNavProps}
                  />
                )}
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-4"></div>
              <div className="flex items-center justify-end">
                <div className="flex gap-2 md:gap-4">
                  <div className="block">
                    <SearchButton defaultTranslation={translation || 'KJV'} />
                  </div>
                  <div className="block">
                    {parallelButtonProps && (
                      <ParallelButton
                        parallelButtonProps={parallelButtonProps}
                      />
                    )}
                  </div>
                  {user ? (
                    <AvatarButton
                      name={user.name}
                      imageUrl={user.photo_url}
                      fontSize={user.preference.font_size || 0}
                    />
                  ) : (
                    <SettingsButton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {headerMidNavProps && <Separator />}
        <div
          className={cn(
            'h-16 hidden items-center justify-center',
            headerMidNavProps && 'flex',
          )}
        >
          {headerMidNavProps && <HeaderMidNav {...headerMidNavProps} />}
        </div>
        <Separator />
      </div>
      <div className={cn('h-16', headerMidNavProps && 'h-36')}>
        {/* empty div to offset the space the fixed header takes */}
      </div>
    </div>
  );
}
