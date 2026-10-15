import baseConfig from "@vincero/tailwind-config/base";

// Paths are relative to the app (apps/<site>), which loads this config
export default {
  ...baseConfig,

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/site/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
};
