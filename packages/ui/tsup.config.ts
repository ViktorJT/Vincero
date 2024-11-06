import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    "banner/index": "src/organisms/banner/index.tsx",
    "carousel/index": "src/organisms/carousel/index.tsx",
    "contact/index": "src/organisms/contact/index.tsx",
    "header/index": "src/organisms/header/index.tsx",
    "overview/index": "src/organisms/overview/index.tsx",
    "slider/index": "src/organisms/slider/index.tsx",

    /* @todos Reorganise these or update paths? */
    "media/index": "src/molecules/media/index.tsx",
    "text/index": "src/molecules/text/index.tsx",
  },
  dts: true,
  format: ["esm"],
  external: ["react"],
  ...options,
}));
