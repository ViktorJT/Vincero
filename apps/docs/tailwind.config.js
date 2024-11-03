import baseConfig from "@vincero/tailwind-config/base";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
    },
  },

  plugins: [animate],
};
