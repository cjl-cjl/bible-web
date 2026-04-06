'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from './ui/dropdown-menu';
import { Avatar, AvatarImage } from './ui/avatar';
import Form from 'next/form';
import { logout } from '@/app/logout';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import FontSizeSwitcher from './FontSizeSwitcher';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AvatarProps = {
  name: string;
  imageUrl: string;
  fontSize: number;
};

export default function AvatarButton({
  name,
  imageUrl,
  fontSize,
}: AvatarProps) {
  const pathname = usePathname();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 hover:cursor-pointer">
          <AvatarImage src={imageUrl} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-bold">{name}</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Dark theme
            <DropdownMenuShortcut>
              <ThemeToggleSwitch></ThemeToggleSwitch>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Font size
            <DropdownMenuShortcut>
              <FontSizeSwitcher fontSize={fontSize}></FontSizeSwitcher>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer">
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <Link passHref href="/settings">
            <DropdownMenuItem className="hover:cursor-pointer">
              Settings
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <Form action={logout}>
            <input type="hidden" name="redirect" value={pathname} />
            <DropdownMenuItem>
              <button
                type="submit"
                className="hover:cursor-pointer h-full w-full"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </Form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
