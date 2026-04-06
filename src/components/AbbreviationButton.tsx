import { BibleBookConstant } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type AbbreviationButton = {
  book: BibleBookConstant;
  translation: string;
};

const AbbreviationButton = ({ book, translation }: AbbreviationButton) => {
  return (
    <Button
      asChild
      className="w-14 h-10 sm:w-18 sm:h-12 hover:cursor-pointer"
      variant="outline"
    >
      <Link href={`/${translation}/${book.book.replaceAll(' ', '-')}`}>
        {book.abbreviation}
      </Link>
    </Button>
  );
};

export default AbbreviationButton;
