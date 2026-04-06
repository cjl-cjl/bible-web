import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { AvailableTranslation } from '@/lib/types';
import Link from 'next/link';

type TranslationCardProp = {
  translation: AvailableTranslation;
};

const TranslationCard = ({ translation }: TranslationCardProp) => {
  return (
    <Link href={`/${translation.name}`} prefetch={false} className="block">
      <Card className="h-full hover:bg-accent sm:min-h-40">
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg">{translation.name}</CardTitle>
          <CardDescription className="space-y-1">
            <p className="text-base font-medium text-foreground">
              {translation.full_name}
            </p>
            <p className="text-sm text-muted-foreground">{translation.year}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">
              {translation.regional_name}
            </span>
            <Badge variant="outline" className="text-xs">
              {translation.language}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TranslationCard;
