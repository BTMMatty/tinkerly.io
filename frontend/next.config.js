/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔧 CRITICAL: Disable telemetry to prevent hanging
  telemetry: false,
  
  // 🚀 Memory optimizations for Next.js 15
  experimental: {
    webpackMemoryOptimizations: true,
    webpackBuildWorker: true,
    preloadEntriesOnStart: false,
    
    // Optimize package imports for your specific stack
    optimizePackageImports: [
      '@clerk/nextjs',
      '@supabase/supabase-js',
      'lucide-react',
      'framer-motion'
    ],
  },
  
  // 💾 Disable source maps to save memory in production
  productionBrowserSourceMaps: false,
  
  // ⏱️ Increase build timeout for complex projects
  staticPageGenerationTimeout: 1000,
  
  // 🔧 Webpack configuration for stability
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in production builds to prevent hanging
    if (!dev && config.cache) {
      config.cache = false;
    }
    
    // Optimize for Vercel's build environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // 🛡️ Output configuration for better debugging
  output: 'standalone',
  
  // 🚫 Disable experimental features that cause issues
  swcMinify: true,
  
  // 📱 Image optimization settings
  images: {
    domains: ['images.clerk.dev'], // For Clerk user avatars
    unoptimized: false,
  },
};

export default nextConfig;