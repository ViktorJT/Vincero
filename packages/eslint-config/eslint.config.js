import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import onlyWarnPlugin from "eslint-plugin-only-warn";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

// Base configuration for all files
const baseConfig = {
  files: ["**/*.{js,jsx,ts,tsx}"],
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.next/**",
    "**/coverage/**",
  ],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    "only-warn": onlyWarnPlugin,
  },
};

// TypeScript configuration
const typescriptConfig = {
  ...baseConfig,
  files: ["**/*.{ts,tsx}"],
  plugins: {
    ...baseConfig.plugins,
    "@typescript-eslint": tsPlugin,
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      React: "readonly",
      JSX: "readonly",
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tsPlugin.configs["recommended"].rules,
    ...tseslint.configs.recommended.rules,
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-import-type-side-effects": "warn",
  },
};

// React configuration
const reactConfig = {
  ...baseConfig,
  files: ["**/*.{jsx,tsx}"],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: {
    ...baseConfig.plugins,
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
  },
};

// Storybook configuration
const storybookConfig = {
  ...reactConfig,
  files: ["**/*.stories.{js,jsx,ts,tsx}", "**/stories/**/*.{js,jsx,ts,tsx}"],
  plugins: {
    ...reactConfig.plugins,
    storybook: storybookPlugin,
  },
  rules: {
    ...reactConfig.rules,
    ...storybookPlugin.configs.recommended.rules,
  },
};

// Export configuration factory
export function createConfig(type = "base", options = {}) {
  // Start with TypeScript and Prettier config
  const configs = [typescriptConfig, prettierConfig];

  switch (type) {
    case "react":
      return [...configs, reactConfig];
    case "storybook":
      return [...configs, reactConfig, storybookConfig];
    default:
      return configs;
  }
}

export default createConfig();
