'use client';

import { Button } from './ui/button';
import { Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuItem,
  DropdownMenuGroup,
} from './ui/dropdown-menu';
import Link from 'next/link';
import ThemeToggleSwitch from './ThemeToggleSwitch';

export default function SettingsButton() {
  const pathname = usePathname();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="md:w-12 md:h-10 hover:cursor-pointer"
        >
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-48">
        <DropdownMenuLabel className="font-bold">设置</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            深色主题
            <DropdownMenuShortcut>
              <ThemeToggleSwitch></ThemeToggleSwitch>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator></DropdownMenuSeparator>

        <DropdownMenuGroup>
          <Link
            href={`/login?redirect=${encodeURIComponent(pathname)}`}
            passHref
          >
            <DropdownMenuItem className="hover:cursor-pointer">
              登录
            </DropdownMenuItem>
          </Link>
          <Link
            href={`/signup?redirect=${encodeURIComponent(pathname)}`}
            passHref
          >
            <DropdownMenuItem className="hover:cursor-pointer">
              注册
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
