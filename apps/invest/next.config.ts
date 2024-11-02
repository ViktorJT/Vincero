import withBundleAnalyzer from "@next/bundle-analyzer";

import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["@vincero/ui"],
  modularizeImports: {
    "@vincero/ui": {
      transform: "@vincero/ui/dist/components/{{member}}",
      skipDefaultConversion: true,
    },
  },
  // Turbopack configuration
  experimental: {
    turbo: {
      resolveAlias: {
        // Ensure proper module resolution
        "@vincero/ui": "@vincero/ui/dist",
      },
    },
  },
};

export default bundleAnalyzer(config);
