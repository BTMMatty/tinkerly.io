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
        // Light theme for better readability
        baseTheme: undefined, // Use default light theme
        variables: {
          colorPrimary: '#10b981', // Emerald-500
          colorBackground: '#ffffff',
          colorText: '#1f2937', // Dark gray for text
          colorTextSecondary: '#6b7280', // Medium gray for secondary text
          colorInputBackground: '#ffffff',
          colorInputText: '#1f2937',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '0.75rem',
        },
        elements: {
          // Modal and card styling
          modalContent: "bg-white shadow-2xl border border-gray-200",
          card: "bg-white shadow-xl border border-gray-200 rounded-xl",
          
          // Header styling
          headerTitle: "text-gray-900 text-2xl font-bold",
          headerSubtitle: "text-gray-600 text-base",
          
          // Button styling - emerald gradient
          formButtonPrimary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0",
          
          // Social buttons
          socialButtonsBlockButton: "bg-white border border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-all duration-200 font-medium",
          socialButtonsBlockButtonText: "text-gray-700 font-medium",
          
          // Form fields
          formFieldLabel: "text-gray-700 font-medium text-sm",
          formFieldInput: "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 transition-colors",
          formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700",
          
          // Links and text
          footerActionText: "text-gray-600 text-sm",
          footerActionLink: "text-emerald-600 hover:text-emerald-700 font-medium",
          
          // Divider
          dividerText: "text-gray-500 text-sm",
          dividerLine: "bg-gray-200",
          
          // Error states
          formFieldErrorText: "text-red-600 text-sm",
          
          // Loading states
          spinner: "text-emerald-500",
          
          // Modal backdrop
          modalBackdrop: "bg-black bg-opacity-50 backdrop-blur-sm",
          
          // Additional elements for better styling
          formFieldSuccessText: "text-emerald-600 text-sm",
          identityPreviewText: "text-gray-700",
          identityPreviewEditButton: "text-emerald-600 hover:text-emerald-700",
          
          // Make sure all text is readable
          alertText: "text-gray-900",
          formHeaderTitle: "text-gray-900 text-xl font-semibold",
          formHeaderSubtitle: "text-gray-600",
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