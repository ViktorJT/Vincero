import type { Meta, StoryObj } from "@storybook/react";
import { Media } from "@vincero/ui/media";

const meta: Meta<typeof Media> = {
  component: Media,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["submit", "reset"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Media>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Media {...props}>Hello</Media>,
  name: "Media",
  args: {
    children: "Hello",
    style: {
      color: "blue",
      border: "1px solid gray",
      padding: 10,
      borderRadius: 10,
    },
  },
};
