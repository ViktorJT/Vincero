import withBundleAnalyzer from "@next/bundle-analyzer";

// Shared Next.js config for every Vincero app. Apps call this from next.config.ts.
export function createNextConfig() {
  return withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: false,
  })({
    images: {
      // Hygraph resizes the images itself, so Vercel's image quota isn't used
      loader: "custom",
      loaderFile: "./node_modules/@vincero/site/src/utils/imageLoader.ts",
    },

    reactStrictMode: true,
    poweredByHeader: false,

    transpilePackages: ["@vincero/ui", "@vincero/site"],
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
  });
}
