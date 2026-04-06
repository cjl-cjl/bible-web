'use client';

import * as React from 'react';
import { Search, Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BOOK_LIST, availableTranslations } from '@/lib/constants';
import { searchRedirectAction } from '@/lib/actions';

const bookList = BOOK_LIST.map((b) => b.book);

const OLD_TESTAMENT = bookList.slice(0, 39);
const NEW_TESTAMENT = bookList.slice(39);

export default function SearchButton({
  defaultTranslation,
}: {
  defaultTranslation: string;
}) {
  const [query, setQuery] = React.useState('');
  const [translation, setTranslation] = React.useState(defaultTranslation);
  const [selectedBooks, setSelectedBooks] = React.useState<string[]>([]);
  const [matchCase, setMatchCase] = React.useState(false);
  const [wholeWords, setWholeWords] = React.useState(false);
  const parallelTranslations: string[] = [];
  const [dropdownMenuOpen, setDropdownMenuOpen] = React.useState(false);

  const toggleBook = (book: string) => {
    setSelectedBooks((prev) =>
      prev.includes(book) ? prev.filter((b) => b !== book) : [...prev, book],
    );
  };

  const selectTestament = (type: 'old' | 'new') => {
    const books = type === 'old' ? OLD_TESTAMENT : NEW_TESTAMENT;
    setSelectedBooks((prev) => {
      const otherBooks = prev.filter((b) => !books.includes(b));
      const allSelected = books.every((b) => prev.includes(b));
      return allSelected
        ? otherBooks
        : Array.from(new Set([...prev, ...books]));
    });
  };

  const handleSearch = async () => {
    const books = selectedBooks.join(',');
    setDropdownMenuOpen(false);
    await searchRedirectAction({
      query,
      translation,
      matchCase,
      wholeWords,
      books,
      parallelTranslations,
    });
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <DropdownMenu
        modal={false}
        open={dropdownMenuOpen}
        onOpenChange={setDropdownMenuOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setDropdownMenuOpen(true)}
            className="md:w-12 md:h-10 hover:cursor-pointer"
          >
            <Search />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] p-4 space-y-4" align="start">
          <div className="space-y-2">
            <DropdownMenuLabel className="px-0 font-bold text-xl">
              Search
            </DropdownMenuLabel>
            <div className="relative">
              <Input
                placeholder="Search query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <DropdownMenuLabel className="px-0 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                Translation
              </DropdownMenuLabel>
              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {availableTranslations.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-4 pt-8">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="match-case"
                  className="hover:cursor-pointer"
                  checked={matchCase}
                  onCheckedChange={(checked) =>
                    setMatchCase(checked as boolean)
                  }
                />
                <label
                  htmlFor="match-case"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Match Case
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whole-words"
                  className="hover:cursor-pointer"
                  checked={wholeWords}
                  onCheckedChange={(checked) =>
                    setWholeWords(checked as boolean)
                  }
                />
                <label
                  htmlFor="whole-words"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Whole Words
                </label>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <DropdownMenuLabel className="px-0">
                Scope & Books
              </DropdownMenuLabel>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs hover:cursor-pointer"
                  onClick={() => selectTestament('old')}
                >
                  Old Testament
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs hover:cursor-pointer"
                  onClick={() => selectTestament('new')}
                >
                  New Testament
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[200px] border rounded-md p-2 bg-muted/30">
              <div className="grid grid-cols-2 gap-1">
                {bookList.map((book) => (
                  <button
                    key={book}
                    onClick={() => toggleBook(book)}
                    className={cn(
                      'flex items-center justify-between px-2 py-1.5 text-xs rounded-sm transition-colors text-left hover:cursor-pointer',
                      selectedBooks.includes(book)
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-accent hover:text-accent-foreground',
                    )}
                  >
                    <span className="truncate">{book}</span>
                    {selectedBooks.includes(book) && (
                      <Check className="w-3 h-3 ml-1 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>

            {selectedBooks.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2 max-h-16 overflow-y-auto pt-1">
                {selectedBooks.slice(0, 5).map((book) => (
                  <Badge
                    key={book}
                    variant="secondary"
                    className="text-[10px] h-5"
                  >
                    {book}
                  </Badge>
                ))}
                {selectedBooks.length > 5 && (
                  <Badge variant="secondary" className="text-[10px] h-5">
                    +{selectedBooks.length - 5} more
                  </Badge>
                )}
                <Button
                  variant="link"
                  className="h-5 p-0 text-[10px] ml-auto text-destructive hover:cursor-pointer"
                  onClick={() => setSelectedBooks([])}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>

          <Button
            className="w-full mt-2 hover:cursor-pointer"
            onClick={handleSearch}
            disabled={query.length < 3}
          >
            Search
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
