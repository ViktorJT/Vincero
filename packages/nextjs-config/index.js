/**
 * @param {import('next').NextConfig} appConfig
 * @returns {import('next').NextConfig}
 */
export const createNextConfig = (appConfig = {}) => {
  /** @type {import('next').NextConfig} */
  const baseConfig = {
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
        loaders: {
          // Configure loaders for specific file types
          ".css": ["style-loader", "css-loader", "postcss-loader"],
        },
        resolveAlias: {
          // Ensure proper module resolution
          "@vincero/ui": "@vincero/ui/dist",
        },
      },
    },
  };

  // Merge configurations
  const config = {
    ...baseConfig,
    ...appConfig,
    experimental: {
      ...baseConfig.experimental,
      ...appConfig.experimental,
      turbo: {
        ...baseConfig.experimental?.turbo,
        ...appConfig.experimental?.turbo,
      },
    },
  };

  return config;
};
