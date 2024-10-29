/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
          light: "var(--secondary-light)",
        },
      },
    },
  },
  plugins: [],
};
