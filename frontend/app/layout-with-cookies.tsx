import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  title: 'Tinkerly - Your Developer Studio',
  description: 'AI-powered development platform with ethical pricing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
