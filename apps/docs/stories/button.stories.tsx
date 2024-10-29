// apps/docs/stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@vincero/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
    size: "md",
  },
};

// Test all sizes
export const AllSizes: Story = {
  render: () => (
    <div className="ui-flex ui-flex-col ui-gap-4">
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </div>
  ),
};

// Test all variants
export const AllVariants: Story = {
  render: () => (
    <div className="ui-flex ui-flex-col ui-gap-4">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  ),
};

// Test hover states
export const HoverStates: Story = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  render: () => (
    <div className="ui-flex ui-flex-col ui-gap-4">
      <Button variant="primary">Hover Primary</Button>
      <Button variant="secondary">Hover Secondary</Button>
    </div>
  ),
};
