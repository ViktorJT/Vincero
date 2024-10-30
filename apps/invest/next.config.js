import { createNextConfig } from "@vincero/nextjs-config";
import { withSentryConfig } from "@sentry/nextjs/build/types/client";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = createNextConfig({
  // App-specific config
  env: {
    APP_SPECIFIC_VAR: process.env.APP_SPECIFIC_VAR,
  },
  async redirects() {
    return [
      // App-specific redirects
    ];
  },
  // Other app-specific settings
});

const sentryConfig = withSentryConfig(
  nextConfig,
  { silent: true },
  { transpileClientSDK: true },
);

export default bundleAnalyzer(sentryConfig);
