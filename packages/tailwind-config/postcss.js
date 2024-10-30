/** @type {import('postcss').Config} */
export default {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: "no-2009",
    },
  },
};
