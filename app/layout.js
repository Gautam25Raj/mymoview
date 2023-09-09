import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/redux/provider';

import Footer from '@/components/Footer';
import ComplexNavbar from '@/components/ComplexNavBar';
import SearchBtn from '@/components/Nav/SearchBtn';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  creator: 'Gautam Raj',
  publisher: 'Gautam Raj',
  title: 'MyMoView',
  applicationName: 'MyMoView',
  description:
    'Movie and TV show database. Search and discover the best movies and TV shows of all time.',
  authors: [{ name: 'Gautam Raj', url: 'https://gautam-raj.vercel.app' }],

  icons: {
    shortcut: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  appleWebApp: {
    title: 'MyMoView',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <SearchBtn />
          <ComplexNavbar />
          <main className="mx-auto max-w-screen-2xl">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
