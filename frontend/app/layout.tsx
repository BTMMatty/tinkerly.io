/* ========================================
   LAYOUT.TSX - SIMPLIFIED VERSION
   ======================================== */

export const runtime = 'nodejs';

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import TinkerlyChat from '@/components/TinkerlyChat';

export const metadata = {
  title: 'Tinkerly.io - Your Developer Studio',
  description: 'Professional developer services with a magical touch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#10b981',
          colorBackground: '#ffffff',
          colorText: '#111827',
          colorInputBackground: '#ffffff',
          colorInputText: '#111827',
          borderRadius: '0.5rem',
        },
        elements: {
          card: 'shadow-2xl border border-gray-300',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-600',
          formButtonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold',
          formFieldInput: 'border-gray-300 text-gray-900',
          formFieldLabel: 'text-gray-900 font-medium',
          footerActionLink: 'text-emerald-600 hover:text-emerald-700',
        }
      }}
    >
      <html lang="en" className="scroll-smooth">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className="min-h-screen bg-white antialiased flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <TinkerlyChat />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}