import withBundleAnalyzer from "@next/bundle-analyzer";

import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const config: NextConfig = {
  //output: "export", // Statically generate site
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.graphassets.com" }],
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

  // Turbopack configuration
  experimental: {
    workerThreads: false,
    cpus: 1,

    turbo: {
      resolveAlias: {
        // Ensure proper module resolution
        "@vincero/ui": "@vincero/ui/dist",
      },
    },
  },
};

export default bundleAnalyzer(config);
