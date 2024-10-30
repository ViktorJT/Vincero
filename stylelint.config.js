/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-prettier",
    "stylelint-config-standard",
    "stylelint-config-tailwindcss",
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "layer", "screen", "variants"],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null, // Allow Tailwind class patterns
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme"],
      },
    ],
  },
};
