import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  minify: true,
  bundle: true,
  platform: "browser",
  esbuildOptions(options) {
    options.jsx = "automatic"; // Modern React JSX transform
  },
});
