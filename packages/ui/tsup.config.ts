import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["components/index.ts"],
  format: "esm",
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
      declaration: true,
      declarationMap: true,
    },
  },
  splitting: true,
  sourcemap: process.env.NODE_ENV === "development",
  clean: true,
  external: ["react", "react-dom", "tailwindcss", "@radix-ui/*", "gsap"],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
  minify: process.env.NODE_ENV === "production",
  bundle: true,
  platform: "browser",
  esbuildOptions(options) {
    options.jsx = "automatic"; // Modern React JSX transform
    options.target = "es2020";
  },
  loader: {
    ".css": "local-css",
  },
});
