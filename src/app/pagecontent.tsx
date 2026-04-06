import type { AvailableTranslation } from '@/lib/types';
import TranslationCard from '@/app/TranslationCard';

type PageContentProps = {
  availableTranslations: AvailableTranslation[];
};

const PageContent = ({ availableTranslations }: PageContentProps) => {
  return (
    <div className="px-4">
      <h2 className="text-xl my-6 text-center font-bold xl:text-2xl xl:my-8">
        Available Translations
      </h2>
      <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 my-6 mx-auto xl:gap-14 md:w-[640px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px] xl:mt-10">
        {availableTranslations.map((item, index) => (
          <TranslationCard key={index} translation={item} />
        ))}
      </div>
    </div>
  );
};

export default PageContent;
