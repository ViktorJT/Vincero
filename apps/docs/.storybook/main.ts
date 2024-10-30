import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  // Modern glob pattern for stories
  stories: ["../stories/**/*.stories.@(ts|tsx)"],

  addons: ["@storybook/addon-essentials", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: true,
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@vincero/fastigheter": path.resolve(
            __dirname,
            "../../../apps/fastigheter",
          ),
          "@vincero/invest": path.resolve(__dirname, "../../../apps/invest"),
        },
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              docs: ["@storybook/addon-docs"],
              vendor: ["react", "react-dom"],
            },
          },
        },
      },
    });
  },

  //core: {
  //  disableTelemetry: true,
  //  enableCrashReports: false,
  //},

  // Typescript support
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true,
  },
};

export default config;
