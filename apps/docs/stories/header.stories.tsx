import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@vincero/ui";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Main heading of the header section",
    },
    description: {
      control: "text",
      description: "Supporting text below the title",
    },
    links: {
      control: "object",
      description: "Call to action links",
    },
    className: {
      control: "text",
      description: "Additional classes for the container",
    },
    contentClassName: {
      control: "text",
      description: "Additional classes for the content wrapper",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "Welcome to Vincero",
    description:
      "A modern, themeable component library for building beautiful interfaces.",
    links: [
      {
        href: "#",
        label: "Get Started",
        variant: "default",
      },
      {
        href: "#",
        label: "Learn More",
        variant: "secondary",
      },
    ],
  },
};
