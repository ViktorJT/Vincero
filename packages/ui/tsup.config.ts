import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    "header/index": "src/header/index.tsx",
    "carousel/index": "src/carousel/index.tsx",
    "banner/index": "src/banner/index.tsx",
    "slider/index": "src/slider/index.tsx",
    "text/index": "src/text/index.tsx",
  },
  format: ["esm"],
  dts: true,
  external: ["react"],
  ...options,
}));
