import { createNextConfig } from "@vincero/nextjs-config";

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

export default bundleAnalyzer(nextConfig);
