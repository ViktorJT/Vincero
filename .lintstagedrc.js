export default {
  "**/*.{js,jsx,ts,tsx}": async (files) => {
    const filePaths = files.join(" ");
    return [
      `prettier --write ${filePaths}`,
      `eslint --fix ${filePaths}`,
      "pnpm typecheck", // Uses turbo under the hood via package.json script
    ].filter(Boolean);
  },
  "**/*.css": ["prettier --write", "stylelint --fix"],
  "**/*.{json,md,mdx,yml,yaml}": "prettier --write",
};
