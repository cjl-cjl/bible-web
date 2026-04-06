import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/lib/theme-provider';

const baseFont = Noto_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Scripture - Read the Bible Online',
  description: 'A simple way to read and explore the Word of God',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${baseFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <div
              id="scroll-progress"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '3px',
                width: '0%',
                background: 'rgba(2, 6, 24, 1)',
                zIndex: 9999,
                transition: 'width 0.1s linear',
              }}
            />
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
