import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../styles/globals.css";

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
  decorators: [
    withThemeByDataAttribute({
      themes: {
        fastigheter: "fastigheter",
        invest: "invest",
      },
      defaultTheme: "fastigheter",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
