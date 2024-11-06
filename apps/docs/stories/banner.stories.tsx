import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@vincero/ui/organisms/banner";

const meta: Meta<typeof Banner> = {
  title: "Banner",
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

/*
 *👇 Render functions are a framework-specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Banner {...props} />,
  name: "Banner",
  args: {
    title: "Din partner för tillväxt",
    textBlocks: [
      {
        children: [
          {
            type: "heading-one",
            children: [{ text: "1000+" }],
          },
          {
            type: "paragraph",
            children: [{ text: "Nöjda Hyresgäster" }],
          },
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
      },
      {
        children: [
          {
            type: "heading-one",
            children: [{ text: "150+" }],
          },
          {
            type: "paragraph",
            children: [{ text: "Fastigheter" }],
          },
        ],
      },
      {
        children: [
          {
            type: "heading-one",
            children: [{ text: "10+" }],
          },
          {
            type: "paragraph",
            children: [{ text: "Års Erfarenhet" }],
          },
        ],
      },
    ],
  },
};
