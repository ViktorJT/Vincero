export default {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "next lint", // Next.js specific linting
  ],
  "*.css": ["prettier --write", "stylelint --fix --cache --allow-empty-input"],
};
