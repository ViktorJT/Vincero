import React from "react";
import { useGlobals } from "@storybook/manager-api";
import type { Decorator } from "@storybook/react";

// Import all theme styles
import "@vincero/ui/theme.css";
import "@vincero/fastigheter/styles/theme.css";
import "@vincero/invest/styles/theme.css";

export const WithTheme: Decorator = (Story, context) => {
  const [{ theme }] = useGlobals();

  return (
    <div data-theme={theme === "base" ? undefined : theme}>
      <Story {...context} />
    </div>
  );
};
