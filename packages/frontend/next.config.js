"use strict";

module.exports = {
  poweredByHeader: false,
  pageExtensions: ["tsx", "mdx"],
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  generateBuildId: async () => "constant-build-id",
  productionBrowserSourceMaps: true,
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 5,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    API_URL: process.env.API_URL,
  },
  experimental: {
    scrollRestoration: true,
  },
  trailingSlash: false,
};
