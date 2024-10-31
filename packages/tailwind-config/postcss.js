/** @type {import('postcss').Config} */
export default {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: "no-2009",
    },
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: [
              "default",
              {
                normalizeWhitespace: false,
              },
            ],
          },
        }
      : {}),
  },
};
