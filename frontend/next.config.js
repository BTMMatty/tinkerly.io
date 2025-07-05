/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing working settings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Just the essential fixes for Vercel
  experimental: {
    esmExternals: false,
  },
  
  // Disable telemetry to prevent hangs
  telemetry: false,
  
  // Use Terser instead of SWC for stability
  swcMinify: false,
}

module.exports = nextConfig