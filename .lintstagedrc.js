export default {
  "**/*.{js,jsx,ts,tsx}": (files) => [
    `prettier --write ${files.join(" ")}`,
    `eslint --fix --max-warnings 0 --cache ${files.join(" ")}`,
  ],
  "**/*.css": [
    "prettier --write",
    "stylelint --fix --cache --allow-empty-input --max-warnings 0",
  ],
  "**/*.{json,md,mdx,yml,yaml}": ["prettier --write"],
};
