import { BibleBook } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type BookButton = {
  book: BibleBook;
  translation: string;
  numChapters: number;
};

const BookButton = ({ book, translation, numChapters }: BookButton) => {
  return (
    <Button asChild variant="outline">
      <Link
        className="h-10 w-72 hover:cursor-pointer mx-auto flex justify-between"
        href={`/${translation}/${book.book.replaceAll(' ', '-')}`}
      >
        <span>{book.book_name} </span>
        <span className="text-muted-foreground text-xs bg-muted p-1 rounded">
          {numChapters}
        </span>
      </Link>
    </Button>
  );
};

export default BookButton;
