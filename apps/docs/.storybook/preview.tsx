import React from "react";
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import "../styles/globals.css";

// Custom decorator to apply data attributes
const WithDataAttributes = (Story, context) => {
  const { theme, mode } = context.globals;

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.setAttribute("data-theme", theme);
    htmlElement.setAttribute("data-mode", mode);
  }, [theme, mode]);

  return <Story />;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "fastigheter",
      toolbar: {
        items: [
          { value: "fastigheter", title: "Fastigheter", icon: "admin" },
          { value: "invest", title: "Invest", icon: "graphline" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      name: "Mode",
      defaultValue: "light",
      toolbar: {
        items: [
          { value: "light", title: "Light", icon: "eye" },
          { value: "dark", title: "Dark", icon: "eyeclose" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [WithDataAttributes],
};

export default preview;
