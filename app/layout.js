import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/redux/provider';
import Footer from '@/components/Footer';
import ComplexNavbar from '@/components/ComplexNavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MeMo View',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ComplexNavbar />
          <main className="mx-auto max-w-2xl">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
