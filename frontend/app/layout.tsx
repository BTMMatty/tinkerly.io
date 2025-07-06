import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  title: 'Tinkerly.io - AI-Powered Development Studio',
  description: 'Transform your ideas into reality with AI-powered project scoping, transparent pricing, and 50% faster delivery. Where code meets magic.',
  keywords: 'AI development, software development, transparent pricing, ethical tech, automated development',
  authors: [{ name: 'Matthew Adams' }],
  creator: 'Tinkerly.io',
  publisher: 'Tinkerly.io',
  robots: 'index, follow',
  
  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tinkerly.io',
    siteName: 'Tinkerly.io',
    title: 'Tinkerly.io - Where Code Meets Magic ✨',
    description: 'Revolutionary AI-powered development platform. 50% faster delivery, transparent pricing, ethical business.',
    images: [
      {
        url: 'https://tinkerly.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tinkerly.io - AI-Powered Development Studio',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Tinkerly.io - Where Code Meets Magic ✨',
    description: 'Revolutionary AI-powered development platform. 50% faster delivery, transparent pricing, ethical business.',
    images: ['https://tinkerly.io/og-image.png'],
    creator: '@TinkerlyIO',
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  
  // Manifest
  manifest: '/site.webmanifest',
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
          <Footer />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}