import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "base",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "base", title: "Base UI" },
          { value: "fastigheter", title: "Fastigheter" },
          { value: "invest", title: "Invest" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, { globals }) => (
      <div className="antialiased" data-theme={globals.theme}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
