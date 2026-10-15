import baseConfig from "@vincero/tailwind-config/postcss";

/** @type {import('postcss').Config} */
export default {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    tailwindcss: {},
  },
};
