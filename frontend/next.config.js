/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===============================================
  // VERCEL DEPLOYMENT FIXES
  // ===============================================
  
  // Disable telemetry to prevent build hangs
  telemetry: false,
  
  // Disable SWC minification (use Terser instead for stability)
  swcMinify: false,
  
  // ===============================================
  // BUILD CONFIGURATION
  // ===============================================
  
  // Keep your existing build settings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ===============================================
  // PERFORMANCE & STABILITY
  // ===============================================
  
  // Experimental settings for Next.js 15 stability
  experimental: {
    // Disable ESM externals to prevent module resolution issues
    esmExternals: false,
    
    // Disable server components logging that can cause hangs
    logging: {
      level: 'error'
    }
  },
  
  // ===============================================
  // WEBPACK CONFIGURATION
  // ===============================================
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fix for potential module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // ===============================================
  // OUTPUT CONFIGURATION
  // ===============================================
  
  // Ensure proper output for Vercel
  output: 'standalone',
  
  // ===============================================
  // ENVIRONMENT & RUNTIME
  // ===============================================
  
  // Environment variables that should be available at build time
  env: {
    CUSTOM_KEY: 'tinkerly-io-platform',
  },
  
  // ===============================================
  // HEADERS & SECURITY
  // ===============================================
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // ===============================================
  // REDIRECTS (for future domain setup)
  // ===============================================
  
  async redirects() {
    return [
      // Add redirects here when you connect tinkerly.io domain
      // Example: www to non-www redirect
    ];
  },
  
  // ===============================================
  // IMAGE OPTIMIZATION
  // ===============================================
  
  images: {
    domains: ['images.clerk.dev', 'img.clerk.com'], // Allow Clerk profile images
    formats: ['image/webp', 'image/avif'],
  },
  
  // ===============================================
  // COMPRESSION & OPTIMIZATION
  // ===============================================
  
  compress: true,
  poweredByHeader: false, // Remove "powered by Next.js" header
  
  // ===============================================
  // TRAILING SLASH HANDLING
  // ===============================================
  
  trailingSlash: false,
};

module.exports = nextConfig;