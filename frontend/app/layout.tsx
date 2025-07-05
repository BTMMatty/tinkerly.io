import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import CookieConsent from '../src/components/CookieConsent';

export const metadata = {
  title: 'Tinkerly - Your Developer Studio',
  description: 'Professional developer services with a magical touch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <main>{children}</main>
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
EOFcat > app/layout.tsx << 'EOF'
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import CookieConsent from '../src/components/CookieConsent';

export const metadata = {
  title: 'Tinkerly - Your Developer Studio',
  description: 'Professional developer services with a magical touch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <main>{children}</main>
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
