import withBundleAnalyzer from "@next/bundle-analyzer";

import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const config: NextConfig = {
  images: {
    // Hygraph resizes the images itself, so Vercel's image quota isn't used
    loader: "custom",
    loaderFile: "./utils/imageLoader.ts",
  },

  reactStrictMode: true,
  poweredByHeader: false,

  transpilePackages: ["@vincero/ui"],
  modularizeImports: {
    "@vincero/ui": {
      transform: "@vincero/ui/dist/{{member}}",
      skipDefaultConversion: true,
    },
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  turbopack: {
    resolveAlias: {
      // Ensure proper module resolution
      "@vincero/ui": "@vincero/ui/dist",
    },
  },
};

export default bundleAnalyzer(config);
