import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./node_modules/@vincero/site/src/i18n/request.ts",
);

// Shared Next.js config for every Vincero app. Apps call this from next.config.ts.
export function createNextConfig() {
  const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: false,
  });

  return withNextIntl(
    withAnalyzer({
      images: {
        // Hygraph resizes the images itself, so Vercel's image quota isn't used
        loader: "custom",
        loaderFile: "./node_modules/@vincero/site/src/utils/imageLoader.ts",
      },

      reactStrictMode: true,
      poweredByHeader: false,

      // Workspace packages are consumed as TypeScript source
      transpilePackages: ["@vincero/ui", "@vincero/site"],

      experimental: {
        workerThreads: false,
        cpus: 1,
      },
    }),
  );
}
