'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Rows2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { availableTranslations } from '@/lib/constants';
import { searchRedirectAction } from '@/lib/actions';
import type { ParallelTranslationResponse } from '@/lib/types';
import { cn } from '@/lib/utils';

type ButtonProps = {
  translation: string;
  parallelTranslations: string[];
  matchCase: boolean;
  wholeWords: boolean;
  query: string;
  books: string | undefined;
};

function ParallelTranslationInfoIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            aria-label="More information"
            className="rounded-full h-4 w-4 hover:cursor-pointer"
          >
            i
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm whitespace-normal text-xs">
          根据搜索词获取经文，并按章节和经文编号显示对应的经文。
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function SearchPageParallelButton({
  translation,
  parallelTranslations,
  matchCase,
  wholeWords,
  query,
  books,
}: ButtonProps) {
  const [selected, setSelected] = useState<string[]>(parallelTranslations);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggle = (tr: string) => {
    setSelected((prev) =>
      prev.includes(tr) ? prev.filter((t) => t !== tr) : [...prev, tr],
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      await searchRedirectAction({
        translation,
        parallelTranslations: selected,
        matchCase,
        wholeWords,
        books,
        query,
      });
      setOpen(false); // close the dropdown
    });
  };

  useEffect(() => {
    setSelected(parallelTranslations);
  }, [parallelTranslations]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'hover:cursor-pointer',
            parallelTranslations.length !== 0 && 'bg-muted',
          )}
        >
          <Rows2 />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-6 space-y-4">
        <div>
          <p className="text-lg font-bold">平行阅读</p>
          <p className="mb-2 text-sm text-muted-foreground">
            选择要一起查看的译本 <ParallelTranslationInfoIcon />
          </p>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {availableTranslations
            .filter((tr) => tr !== translation)
            .map((tr) => (
              <div
                key={tr}
                id={`${tr}-checkbox`}
                className="flex items-center space-x-3"
              >
                <Checkbox
                  id={tr}
                  checked={selected.includes(tr)}
                  onCheckedChange={() => toggle(tr)}
                  className="w-5 h-5 hover:cursor-pointer" // make checkbox bigger
                />
                <label
                  htmlFor={tr}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
                >
                  {tr}
                </label>
              </div>
            ))}
        </div>

        <Button
          onClick={handleSave}
          className="w-full hover:cursor-pointer"
          disabled={isPending}
        >
          {isPending ? '加载中...' : '提交'}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
