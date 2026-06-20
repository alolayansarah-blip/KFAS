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
