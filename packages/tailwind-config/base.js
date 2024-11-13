import defaultTheme from "tailwindcss/defaultTheme.js";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",

  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

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
          fontWeight: "var(--font-weight-regular)",
        },
      ],
      "body-large": [
        "var(--font-size-body-large)",
        {
          lineHeight: "var(--line-height-relaxed)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-regular)",
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
      "heading-small": [
        "var(--font-size-heading-small)",
        {
          lineHeight: "var(--line-height-default)",
          letterSpacing: "var(--letter-spacing-tight)",
          fontWeight: "var(--font-weight-medium)",
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
          fontWeight: "var(--font-weight-medium)",
        },
      ],
    },

    extend: {
      maxWidth: {
        container: "960px",
        "container-text-offset": "1120px",
      },

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
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "mobile-menu-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "mobile-menu-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-8px)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
      },
    },
  },
};
