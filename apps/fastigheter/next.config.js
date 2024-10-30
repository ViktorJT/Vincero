import { createNextConfig } from "@vincero/nextjs-config";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const baseConfig = createNextConfig({
  // app-specific config here
  env: {
    APP_SPECIFIC_VAR: process.env.APP_SPECIFIC_VAR,
  },
  async redirects() {
    return [
      // app-specific redirects
    ];
  },
});

export default bundleAnalyzer(baseConfig);
