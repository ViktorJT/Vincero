import styleLintLogical from "stylelint-use-logical-spec";
import styleLintOrder from "stylelint-order";
import styleLintIgnoredProperties from "stylelint-declaration-block-no-ignored-properties";

/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-tailwindcss",
    "stylelint-config-clean-order",
  ],
  plugins: [styleLintOrder, styleLintIgnoredProperties, styleLintLogical],
  rules: {
    // Modern CSS features
    "value-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "at-rule-no-vendor-prefix": true,

    // Allow empty files
    "no-empty-source": null,

    // Tailwind specific
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
        ],
      },
    ],

    // CSS Modules
    "selector-class-pattern": null,
    "custom-property-empty-line-before": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "local"],
      },
    ],

    // Modern best practices
    "plugin/declaration-block-no-ignored-properties": true,
    "liberty/use-logical-spec": "always",

    // Performance
    "no-descending-specificity": null,
    "max-nesting-depth": 3,
    "selector-max-compound-selectors": 4,
    "selector-max-specificity": "0,4,1",

    // Project conventions
    "color-function-notation": "modern",
    "color-named": "never",
    "alpha-value-notation": "percentage",
    "length-zero-no-unit": true,
    "font-weight-notation": "numeric",
    "font-family-name-quotes": "always-where-recommended",
    "shorthand-property-no-redundant-values": true,
    "declaration-no-important": true,
  },
  overrides: [
    {
      files: ["**/*.module.css"],
      rules: {
        "selector-class-pattern": /^[a-z][a-zA-Z0-9]+$/,
      },
    },
    {
      files: ["**/styles/*.css"],
      rules: {
        "max-nesting-depth": null,
        "selector-max-compound-selectors": null,
      },
    },
  ],
  ignoreFiles: [
    "node_modules/**/*",
    "dist/**/*",
    ".next/**/*",
    "build/**/*",
    "coverage/**/*",
  ],
};
