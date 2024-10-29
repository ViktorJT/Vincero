import baseConfig from "@vincero/tailwind-config/base";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      // App-specific theme extensions
    },
  },
  plugins: [...(baseConfig.plugins || [])],
};
