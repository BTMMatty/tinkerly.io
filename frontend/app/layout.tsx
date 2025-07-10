export const runtime = 'nodejs';

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import TinkerlyChat from '@/components/TinkerlyChat';

export const metadata = {
  title: 'Tinker.io - Your Developer Studio',
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
        // Keep your existing Clerk appearance config here
        elements: {
          formButtonPrimary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200",
          card: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl",
          headerTitle: "text-white text-xl font-semibold",
          headerSubtitle: "text-emerald-200",
          socialButtonsBlockButton: "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all duration-200",
          dividerText: "text-emerald-200",
          formFieldLabel: "text-emerald-200",
          formFieldInput: "bg-white/10 border-white/20 text-white placeholder-emerald-300",
          footerActionText: "text-emerald-200",
          footerActionLink: "text-emerald-400 hover:text-emerald-300"
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
