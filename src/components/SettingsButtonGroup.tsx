'use client';

import { CheckIcon, ChevronDownIcon, MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  serverSetFontFamily,
  serverSetFontSize,
  serverSetMarginSize,
} from '@/lib/actions';

export default function SettingsButtonGroup({
  fontSize,
  marginSize,
  fontFamily,
}: {
  fontSize: number;
  marginSize: number;
  fontFamily: number;
}) {
  const getFontSizeLabel = () => {
    if (fontSize === 0) return 'Default';
    return fontSize > 0 ? `+${fontSize}` : `${fontSize}`;
  };

  const getMarginLabel = () => {
    if (marginSize === 0) return 'Default';
    return marginSize > 0 ? `+${marginSize}` : `${marginSize}`;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ButtonGroup>
          <Button className="hover:cursor-pointer" variant="outline">
            Font Settings
          </Button>
          <Button
            className="!pl-2 bg-transparent hover:cursor-pointer"
            variant="outline"
          >
            <ChevronDownIcon />
          </Button>
        </ButtonGroup>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="[--radius:1rem] min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Font Size: {getFontSizeLabel()}
          </DropdownMenuLabel>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => serverSetFontSize(-1)}
              disabled={fontSize === -2}
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center text-sm font-medium">
              {getFontSizeLabel()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => serverSetFontSize(1)}
              disabled={fontSize === 2}
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="hidden sm:block" />

        <DropdownMenuGroup className="hidden sm:block">
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Margin: {getMarginLabel()}
          </DropdownMenuLabel>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => serverSetMarginSize(-1)}
              disabled={marginSize === -2}
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center text-sm font-medium">
              {getMarginLabel()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => serverSetMarginSize(1)}
              disabled={marginSize === 2}
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Font Family
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={async () => serverSetFontFamily(0)}
          >
            <div
              className="text-muted-foreground"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Aa
            </div>
            Sans
            {fontFamily === 0 && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={async () => serverSetFontFamily(1)}
          >
            <div
              className="text-muted-foreground"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              Aa
            </div>
            Serif
            {fontFamily === 1 && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
