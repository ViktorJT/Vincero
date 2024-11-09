import { fileURLToPath } from "url";
import path from "path";

import baseConfig from "@vincero/tailwind-config/base";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
    },
  },
  plugins: [...(baseConfig.plugins || [])],
};
