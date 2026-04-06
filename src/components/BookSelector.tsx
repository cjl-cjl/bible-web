import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { BOOK_LIST } from '@/lib/constants';

export default function BookSelector({
  translation,
  book,
}: {
  translation: string;
  book: string;
}) {
  return (
    <NavigationMenu delayDuration={150}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:cursor-pointer">
            {book}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[165px] gap-4 max-h-96 overflow-y-scroll">
              <li>
                <h6 className="m-2 font-bold">Old Testament</h6>
                {BOOK_LIST.slice(0, 39).map((item, index) => (
                  <NavigationMenuLink key={index} asChild>
                    <Link
                      href={`/${translation}/${item.book.replaceAll(' ', '-')}`}
                    >
                      {item.book}
                    </Link>
                  </NavigationMenuLink>
                ))}
                <h6 className="m-2 font-bold">New Testament</h6>
                {BOOK_LIST.slice(39, 67).map((item, index) => (
                  <NavigationMenuLink key={index} asChild>
                    <Link
                      href={`/${translation}/${item.book.replaceAll(' ', '-')}`}
                    >
                      {item.book}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
