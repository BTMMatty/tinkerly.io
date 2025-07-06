#!/bin/bash

# 🔧 TINK.IO BUILD FIXES
echo "🛠️ Fixing Tink.io build issues..."

# Fix 1: Import Path Issue in layout.tsx
echo "📁 Fixing import path in layout.tsx..."

# The error shows the import is wrong - let's fix it
cat > src/app/layout.tsx << 'EOF'
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
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
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#10b981" />
        </head>
        <body>
          <main>{children}</main>
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
EOF

echo "✅ Fixed layout.tsx import path"

# Fix 2: Update package.json to fix module warnings
echo "📦 Fixing package.json module type..."

# Add type: module to package.json
npm pkg set type="module"

echo "✅ Fixed package.json module type"

# Fix 3: Fix next.config.js for Next.js 15
echo "⚙️ Fixing next.config.js..."

cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // Remove this for stricter type checking
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
}

export default nextConfig;
EOF

echo "✅ Fixed next.config.js"

# Fix 4: Check if CookieConsent component exists
echo "🍪 Checking CookieConsent component..."

if [ ! -f "src/components/CookieConsent.tsx" ]; then
    echo "📁 Creating missing CookieConsent component..."
    
    mkdir -p src/components
    
    cat > src/components/CookieConsent.tsx << 'EOF'
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings, Check } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('tinker-cookie-consent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('tinker-cookie-consent', 'true');
    setShowBanner(false);
    console.log('🍪 All cookies accepted');
  };

  const rejectNonEssential = () => {
    localStorage.setItem('tinker-cookie-consent', 'essential-only');
    setShowBanner(false);
    console.log('🍪 Only essential cookies accepted');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-2xl border-t border-gray-700">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <Cookie className="w-6 h-6 text-emerald-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2">🍪 We value your privacy</h3>
            <p className="text-gray-300 text-sm mb-4">
              We use cookies to enhance your experience and analyze site traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept All
              </button>
              
              <button
                onClick={rejectNonEssential}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Essential Only
              </button>
            </div>
            
            <div className="mt-3 text-xs text-gray-400">
              Learn more in our{' '}
              <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
EOF

    echo "✅ Created CookieConsent component"
else
    echo "✅ CookieConsent component exists"
fi

# Fix 5: Check TypeScript config
echo "📝 Checking TypeScript configuration..."

if [ ! -f "tsconfig.json" ]; then
    echo "📁 Creating tsconfig.json..."
    
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

    echo "✅ Created tsconfig.json"
else
    echo "✅ tsconfig.json exists"
fi

# Fix 6: Try build again
echo "🏗️ Attempting build again..."

if npm run build; then
    echo ""
    echo "🎉 BUILD SUCCESSFUL! 🎉"
    echo "======================="
    echo ""
    echo "✅ All fixes applied successfully!"
    echo "✅ Next.js build completed!"
    echo "✅ Ready for deployment!"
    echo ""
    echo "🚀 NEXT STEP: Deploy to production!"
    echo "Run: npx vercel --prod"
    echo ""
else
    echo ""
    echo "🔍 Build still failing. Let's debug..."
    echo "======================================="
    echo ""
    echo "Run these commands to check:"
    echo "1. ls -la src/components/ (check if files exist)"
    echo "2. cat src/app/layout.tsx (check imports)"
    echo "3. npm run lint (check for other issues)"
    echo ""
    echo "Then paste any new errors and I'll fix them! 🔧"
fi