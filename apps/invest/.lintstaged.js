export default {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix --cache --max-warnings 0",
    "next lint", // Next.js specific linting
  ],
  "*.css": ["prettier --write", "stylelint --fix --cache --allow-empty-input"],
};
