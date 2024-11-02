import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    "header/index": "src/header/index.tsx",
    "media/index": "src/media/index.tsx",
  },
  format: ["esm"],
  dts: true,
  external: ["react"],
  ...options,
}));
