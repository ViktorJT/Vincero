import baseConfig from "@vincero/tailwind-config/postcss";
import tailwindConfig from "./tailwind.config.js";

/** @type {import('postcss').Config} */
export default {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    tailwindcss: tailwindConfig,
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: [
              "default",
              {
                normalizeWhitespace: false,
              },
            ],
          },
        }
      : {}),
  },
};
