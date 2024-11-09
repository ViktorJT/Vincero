import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    "banner/index": "src/organisms/banner/index.tsx",
    "carousel/index": "src/organisms/carousel/index.tsx",
    "form/index": "src/organisms/form/index.tsx",
    "footer/index": "src/organisms/footer/index.tsx",
    "header/index": "src/organisms/header/index.tsx",
    "navigation/index": "src/organisms/navigation/index.tsx",
    "overview/index": "src/organisms/overview/index.tsx",
    "slider/index": "src/organisms/slider/index.tsx",

    /* @todos Reorganise these or update paths? */
    "media/index": "src/molecules/media/index.tsx",
    "text/index": "src/molecules/text/index.tsx",
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

    // Animation libraries
    "gsap",
    "@gsap/react",

    // UI Components
    "lucide-react",
    "embla-carousel-react",
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
        treeshake: true, // Remove dead code
        sourcemap: false, // No debug files
      }),

  ...options,
}));
