/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  // Removed static export for Heroku server deployment
  images: {
    unoptimized: true, // Required for deployment platforms that don't support sharp (e.g. DigitalOcean)
  },
  // Tree-shake heavy icon/motion imports so route JS stays smaller
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  compress: true,
  poweredByHeader: false,
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
  // // Performance optimizations
  // compress: true,
  // poweredByHeader: false,
  // reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/about/our-team",
  //       destination: "/about/our-team",
  //       permanent: true,
  //     },
  //   ];
  // },
  
  // Canonical routes use capital R: /Research, /Research/grants. Rewrites map lowercase URLs for compatibility.
  // async rewrites() {
  //   return [
  //     { source: "/research/grants", destination: "/Research/grants" },
  //     { source: "/research", destination: "/Research" },
  //   ];
  // },
  // Cache static assets; keep HTML fresh so deploys show up immediately
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
