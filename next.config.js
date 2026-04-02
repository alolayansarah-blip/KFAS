/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export for Heroku server deployment
  images: {
    unoptimized: true, // Required for deployment platforms that don't support sharp (e.g. DigitalOcean)
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Public URL stays /research/grants; app folder stays app/Research/grants (Windows case rename is awkward).
  // Rewrite only — do not add a redirect from /Research/grants → /research/grants (that + rewrite caused loops).
  async rewrites() {
    return [
      {
        source: "/research/grants",
        destination: "/Research/grants",
      },
    ];
  },
  // Add headers to help with cache invalidation
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
