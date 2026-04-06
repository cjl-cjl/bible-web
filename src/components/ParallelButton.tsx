'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Rows2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { availableTranslations } from '@/lib/constants';
import { saveParallelTranslations } from '@/lib/actions';
import type { ParallelTranslationResponse } from '@/lib/types';
import { toast } from 'sonner';

type Props = {
  parallelButtonProps: ParallelTranslationResponse;
};

export default function ParallelButton({ parallelButtonProps }: Props) {
  const [selected, setSelected] = useState<string[]>(
    parallelButtonProps.parallel_translations,
  );
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggle = (tr: string) => {
    setSelected((prev) =>
      prev.includes(tr) ? prev.filter((t) => t !== tr) : [...prev, tr],
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        await saveParallelTranslations({
          source_translation: parallelButtonProps.source_translation,
          parallel_translations: selected,
        });
        toast.success('Preference saved');
        setOpen(false); // close the dropdown
      } catch {
        toast('Error', { description: 'Could not save your preferences.' });
      }
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="md:w-12 md:h-10  hover:cursor-pointer"
        >
          <Rows2 />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-6 space-y-4">
        <div>
          <p className="text-lg font-bold">Parallel Reading</p>
          <p className="mb-2 text-sm text-muted-foreground">
            Select translations to read together.
          </p>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {availableTranslations
            .filter((tr) => tr !== parallelButtonProps.source_translation)
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
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
