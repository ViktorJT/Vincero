import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js"; // Adjust the path as necessary

const useTailwindBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const fullConfig = resolveConfig(tailwindConfig);
    const screens = fullConfig.theme.screens;

    const getBreakpoint = () => {
      const width = window.innerWidth;
      let currentBreakpoint = "xs"; // Default to 'xs' for smallest screens

      for (const [key, value] of Object.entries(screens)) {
        const minWidth = parseInt(value, 10);
        if (width >= minWidth) {
          currentBreakpoint = key;
        }
      }

      setBreakpoint(currentBreakpoint);
    };

    getBreakpoint(); // Initial check

    window.addEventListener("resize", getBreakpoint);
    return () => window.removeEventListener("resize", getBreakpoint);
  }, []);

  return breakpoint;
};

export default useTailwindBreakpoint;
