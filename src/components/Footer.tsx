import Link from 'next/link';
import { Separator } from './ui/separator';

export default function Footer() {
  const menus: { [key: string]: string } = {
    About: '/about',
    Blog: '/blog',
    Resources: '/resources',
    FAQ: '/faq',
    Tips: '/tips',
    Source: 'https://gitlab.com/Scripture/bible-web',
  };

  return (
    <div className="w-full h-14 flex flex-col justify-between">
      <Separator />
      <div className="mx-auto flex gap-4 md:gap-8">
        {Object.entries(menus).map(([label, href]) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-sm text-muted-foreground hover:underline"
          >
            {label}
          </Link>
        ))}
      </div>
      <div aria-hidden></div>
    </div>
  );
}
