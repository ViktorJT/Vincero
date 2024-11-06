import defaultTheme from "tailwindcss/defaultTheme.js";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    fontSize: {
      detail: [
        "var(--font-size-detail)",
        {
          lineHeight: "var(--line-height-relaxed)",
          letterSpacing: "var(--letter-spacing-none)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      display: [
        "var(--font-size-display)",
        {
          lineHeight: "var(--line-height-default)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      "display-large": [
        "var(--font-size-display-large)",
        {
          lineHeight: "var(--line-height-default)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      "display-huge": [
        "var(--font-size-display-huge)",
        {
          lineHeight: "var(--line-height-default)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      body: [
        "var(--font-size-body)",
        {
          lineHeight: "var(--line-height-relaxed)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-light)",
        },
      ],
      "body-large": [
        "var(--font-size-body-large)",
        {
          lineHeight: "var(--line-height-relaxed)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      link: [
        "var(--font-size-link)",
        {
          lineHeight: "var(--line-height-compact)",
          letterSpacing: "var(--letter-spacing-none)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      "link-large": [
        "var(--font-size-link-large)",
        {
          lineHeight: "var(--line-height-compact)",
          letterSpacing: "var(--letter-spacing-none)",
          fontWeight: "var(--font-weight-light)",
        },
      ],
      heading: [
        "var(--font-size-heading)",
        {
          lineHeight: "var(--line-height-default)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-medium)",
        },
      ],
      "heading-large": [
        "var(--font-size-heading-large)",
        {
          lineHeight: "var(--line-height-default)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-regular)",
        },
      ],
    },
    extend: {
      colors: {
        white: "hsl(var(--white))",
        light: "hsl(var(--light))",
        muted: "hsl(var(--muted))",
        dark: "hsl(var(--dark))",
        black: "hsl(var(--black))",
        accent: "hsl(var(--accent))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        // TODO clean this up later, either use or remove
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
