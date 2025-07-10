export const runtime = 'nodejs'; // ADD THIS LINE AT THE VERY TOP

import { ClerkProvider } from '@clerk/nextjs';
import { StripeProvider } from '@/components/StripeProvider';
import './globals.css';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import TinkerlyChat from '@/components/TinkerlyChat';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
          <TinkerlyChat /> {/* Add this line */}
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}

// Keep ALL your existing metadata exactly as is
export const metadata = {
  // ... all your metadata stays the same
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        // ... all your Clerk appearance config stays the same
      }}
    >
      <html lang="en" className="scroll-smooth">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className="min-h-screen bg-white antialiased flex flex-col">
          {/* REMOVE StripeProvider wrapper - we don't need it for Stripe Checkout */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}