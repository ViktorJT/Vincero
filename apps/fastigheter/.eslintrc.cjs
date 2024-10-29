/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@vincero/eslint-config/frontend.js"],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
