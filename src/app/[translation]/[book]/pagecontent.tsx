import { BibleBookConstant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PageContent = {
  translation: string;
  book: BibleBookConstant;
};

const PageContent = ({ book, translation }: PageContent) => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mx-auto my-6 grid w-5/6 grid-cols-4 gap-3 md:grid-cols-6 md:gap-4">
        {Array.from({ length: book.chapters }, (_, i) => (
          <Link
            key={i}
            href={`/${translation}/${book.book.replaceAll(' ', '-')}/${i + 1}`}
            passHref
          >
            <Button
              variant="outline"
              className="w-12 h-10 sm:w-14 sm:h-12 hover:cursor-pointer"
            >
              {i + 1}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageContent;
