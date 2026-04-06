'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { availableTranslations } from '@/lib/constants';
import { Globe, Check } from 'lucide-react';

interface Props {
  translation: string;
}

export function TranslationMenu({ translation }: Props) {
  const pathname = usePathname();

  const buildUrl = (t: string) => {
    const parts = pathname.split('/').filter(Boolean); // remove empty
    parts[0] = t; // replace translation at first segment
    return '/' + parts.join('/');
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-28 hover:cursor-pointer flex items-center justify-center"
          variant="outline"
        >
          <Globe />
          <span className="inline ml-2">{translation}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {availableTranslations.map((t) => (
          <DropdownMenuItem key={t} asChild className="hover:cursor-pointer">
            {t === translation ? (
              <div className="flex items-center justify-between w-full">
                <span>{t}</span>
                <Check className="w-4 h-4" />
              </div>
            ) : (
              <Link href={buildUrl(t)}>{t}</Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
