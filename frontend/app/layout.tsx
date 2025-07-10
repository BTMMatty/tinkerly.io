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
          spacingUnit: '1rem', // Better consistent spacing
        },
        elements: {
          // 🔧 IMPROVED: Modal and card styling with better sizing
          modalContent: "bg-white shadow-2xl border border-gray-200 rounded-xl max-w-md w-full mx-4",
          card: "bg-white shadow-xl border border-gray-200 rounded-xl p-8 w-full max-w-md",
          
          // 🔧 IMPROVED: Header styling with better spacing
          headerTitle: "text-gray-900 text-2xl font-bold mb-2 text-center",
          headerSubtitle: "text-gray-600 text-base mb-6 text-center leading-relaxed",
          
          // 🔧 IMPROVED: Button styling with full width and proper spacing
          formButtonPrimary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0 w-full mt-4",
          
          // 🔧 IMPROVED: Social buttons with consistent spacing
          socialButtonsBlockButton: "bg-white border border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-all duration-200 font-medium py-3 px-4 w-full",
          socialButtonsBlockButtonText: "text-gray-700 font-medium text-sm",
          socialButtonsBlock: "w-full space-y-3 mb-6",
          
          // 🔧 IMPROVED: Form fields with better layout
          formFieldLabel: "text-gray-700 font-medium text-sm mb-2 block",
          formFieldInput: "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 transition-colors py-3 px-4 w-full",
          formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2",
          
          // 🔧 IMPROVED: Form layout
          form: "w-full space-y-4",
          formFieldRow: "w-full mb-4",
          
          // 🔧 IMPROVED: Links and text with better spacing
          footerActionText: "text-gray-600 text-sm text-center mt-6",
          footerActionLink: "text-emerald-600 hover:text-emerald-700 font-medium",
          
          // 🔧 IMPROVED: Divider with proper flex layout
          dividerText: "text-gray-500 text-sm px-4",
          dividerLine: "bg-gray-200 flex-1 h-px",
          dividerRow: "flex items-center my-6 w-full",
          
          // Error states
          formFieldErrorText: "text-red-600 text-sm mt-1",
          
          // Loading states
          spinner: "text-emerald-500",
          
          // 🔧 IMPROVED: Modal backdrop with proper positioning
          modalBackdrop: "bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4",
          
          // Additional elements for better styling
          formFieldSuccessText: "text-emerald-600 text-sm mt-1",
          identityPreviewText: "text-gray-700",
          identityPreviewEditButton: "text-emerald-600 hover:text-emerald-700",
          
          // Make sure all text is readable
          alertText: "text-gray-900 text-sm",
          formHeaderTitle: "text-gray-900 text-xl font-semibold text-center mb-2",
          formHeaderSubtitle: "text-gray-600 text-center mb-6",
          
          // 🔧 IMPROVED: Root container improvements
          rootBox: "w-full",
          main: "w-full max-w-md mx-auto",
          
          // 🔧 IMPROVED: Footer positioning
          footer: "mt-6 text-center w-full",
          footerAction: "text-center mt-4",
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