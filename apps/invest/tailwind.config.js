import baseConfig from "@vincero/tailwind-config/base";

export default {
  ...baseConfig,

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
};
