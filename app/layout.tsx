import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FreePerks — Free Student Developer Perks',
    template: '%s | FreePerks',
  },
  description: 'Verified free tools, cloud credits, software, and perks for student developers. Curated and verified.',
  openGraph: {
    title: 'FreePerks — Free Student Developer Perks',
    description: 'Verified free tools, cloud credits, software, and perks for student developers.',
    type: 'website',
    siteName: 'FreePerks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreePerks — Free Student Developer Perks',
    description: 'Verified free tools, cloud credits, software, and perks for student developers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {/* Skip to browse — accessible shortcut */}
        <a
          href="#browse"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--indigo-electric)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to Browse
        </a>
        <div className="page-shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
