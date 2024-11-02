import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@vincero/ui/header";

const meta: Meta<typeof Header> = {
  component: Header,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["header", "submit", "reset"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Header {...props}>Hello</Header>,
  name: "Header",
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
