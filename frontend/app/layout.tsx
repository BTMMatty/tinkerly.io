import { ClerkProvider } from '@clerk/nextjs';
import { StripeProvider } from '@/components/StripeProvider'; // ← ADD THIS LINE
import './globals.css';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

// Keep ALL your existing metadata exactly as is
export const metadata = {
  title: 'Tinkerly.io - AI-Powered Development Studio',
  description: 'Transform your ideas into reality with AI-powered project scoping, transparent pricing, and 50% faster delivery. Where code meets magic.',
  keywords: 'AI development, software development, transparent pricing, ethical tech, automated development',
  authors: [{ name: 'Matthew Adams' }],
  creator: 'Tinkerly.io',
  publisher: 'Tinkerly.io',
  robots: 'index, follow',
  
  // Critical for preventing zoom issues (already perfect!)
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  
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
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        elements: {
          // Keep ALL your existing ClerkProvider styling - it's perfect!
          formButtonPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg',
          formButtonSecondary: 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50',
          formFieldInput: 'rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500',
          formFieldLabel: 'text-gray-700 font-medium',
          
          // Card elements
          card: 'shadow-xl rounded-2xl border border-gray-100',
          cardHeader: 'border-b border-gray-100',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-600 mt-2',
          
          // Social buttons
          socialButtonsBlockButton: 'border-2 border-gray-300 hover:bg-gray-50 transition-colors',
          socialButtonsBlockButtonText: 'font-medium',
          
          // Links
          footerActionLink: 'text-emerald-600 hover:text-emerald-700 font-medium underline',
          identityPreviewEditButtonIcon: 'text-emerald-600',
          
          // Divider
          dividerLine: 'bg-gray-300',
          dividerText: 'text-gray-500',
          
          // Alerts
          alert: 'rounded-lg',
          alertText: 'text-sm',
          
          // User button
          userButtonPopoverCard: 'shadow-xl border border-gray-100',
          userButtonPopoverActionButton: 'hover:bg-gray-50',
          
          // Profile
          profileSectionTitle: 'text-gray-900 font-semibold',
          profileSectionContent: 'text-gray-600',
          
          // Navbar
          navbar: 'bg-white shadow-sm border-b border-gray-100',
          navbarButton: 'text-gray-600 hover:text-emerald-600',
        },
        layout: {
          socialButtonsPlacement: 'top',
          socialButtonsVariant: 'blockButton',
          showOptionalFields: true,
        },
        variables: {
          // Colors
          colorPrimary: '#10b981',
          colorDanger: '#ef4444',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#1f2937',
          
          // Typography
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '16px',
          fontWeight: {
            normal: 400,
            medium: 500,
            bold: 700,
          },
          
          // Spacing
          spacingUnit: '1rem',
          
          // Border
          borderRadius: '0.5rem',
        }
      }}
    >
      <html lang="en" className="scroll-smooth">
        <head>
          {/* Critical viewport meta tag for preventing zoom issues */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className="min-h-screen bg-white antialiased flex flex-col">
          {/* ONLY ADD: Wrap main content with StripeProvider */}
          <StripeProvider>
            {/* Main content area that grows to push footer down */}
            <main className="flex-grow">
              {children}
            </main>
          </StripeProvider>
          {/* Footer will always stick to bottom */}
          <Footer />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}