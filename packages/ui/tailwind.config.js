import baseConfig from "@vincero/tailwind-config/base";

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "ui-",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...baseConfig.theme?.extend,
    },
  },
  plugins: [...(baseConfig.plugins || [])],
};
