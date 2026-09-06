import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'SAMVEDAI — Cooperative & Rural Information Assistant',
  description:
    'SAMVEDAI helps farmers, cooperative members and rural citizens understand government schemes, cooperative laws, PACS services, crop insurance, financial literacy and grievance procedures — in English, Hindi or Marathi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-size-normal">
      <body className="min-h-screen flex flex-col">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
