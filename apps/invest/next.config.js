import { createNextConfig } from "@vincero/nextjs-config";

export default createNextConfig({
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
