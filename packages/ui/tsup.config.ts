import { defineConfig } from "tsup";
import react18Plugin from "esbuild-plugin-react18";

export default defineConfig((options) => ({
  esbuildPlugins: [react18Plugin()],

  entry: {
    "banner/index": "src/organisms/banner/index.tsx",
    "list/index": "src/organisms/list/index.tsx",
    "carousel/index": "src/organisms/carousel/index.tsx",
    "imageCarousel/index": "src/organisms/imageCarousel/index.tsx",
    "form/index": "src/organisms/form/index.tsx",
    "footer/index": "src/organisms/footer/index.tsx",
    "header/index": "src/organisms/header/index.tsx",
    "loading/index": "src/organisms/loading/index.tsx",
    "navigation/index": "src/organisms/navigation/index.tsx",
    "overview/index": "src/organisms/overview/index.tsx",
    "slider/index": "src/organisms/slider/index.tsx",
    "media/index": "src/organisms/media/index.tsx",
    "text/index": "src/organisms/text/index.tsx",
    "toaster/index": "src/molecules/toaster/index.tsx",
  },

  external: [
    // Peer dependencies
    "react",
    "react-dom",
    "next",
    "tailwindcss",

    // Radix UI components
    "@radix-ui/react-label",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-slot",
    "@radix-ui/react-toast",
    "@radix-ui/react-*", // Catch any other Radix components

    // Form libraries
    "react-hook-form",
  ],

  format: ["esm"],

  ...(options.watch
    ? {
        splitting: false, // Faster builds
        clean: false, // Don't delete files unnecessarily
        minify: false, // Keep code readable
        dts: false, // Skip type generation
        treeshake: false, // Skip tree shaking
        sourcemap: true, // Help with debugging
      }
    : {
        // Production mode
        splitting: true, // Optimize chunks
        clean: true, // Fresh output
        minify: true, // Smaller files
        dts: true, // Generate types
        //treeshake: true, // Remove dead code // ! BUILD CRASHES FOR SOME REASON IF TURNED ON
        sourcemap: false, // No debug files
      }),

  ...options,
}));
