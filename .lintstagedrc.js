export default {
  "**/*.{js,jsx,ts,tsx}": (files) => {
    const filePaths = files.join(" ");
    return [
      `prettier --write ${filePaths}`,
      `eslint --fix ${filePaths}`,
      // Only run type check if .ts or .tsx files are changed
      files.some((file) => /\.tsx?$/.test(file))
        ? "tsc -p tsconfig.json --noEmit"
        : null,
    ].filter(Boolean);
  },
  "**/*.css": (files) => {
    const filePaths = files.join(" ");
    return [`prettier --write ${filePaths}`, `stylelint --fix ${filePaths}`];
  },
  "**/*.{json,md,mdx,yml,yaml}": (files) => {
    const filePaths = files.join(" ");
    return [`prettier --write ${filePaths}`];
  },
};
