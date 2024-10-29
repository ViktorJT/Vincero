export const createNextConfig = (appConfig = {}) => {
  const baseConfig = {
    reactStrictMode: true,
    transpilePackages: ["@vincero/ui"],
    poweredByHeader: false,
  };

  return {
    ...baseConfig,
    ...appConfig,
    // Merge more complex options if needed
    // For example, if both base and app configs have webpack config:
    webpack: (config, options) => {
      config = baseConfig.webpack?.(config, options) ?? config;
      return appConfig.webpack?.(config, options) ?? config;
    },
  };
};
