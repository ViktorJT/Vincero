import type { Meta, StoryObj } from "@storybook/react";
import { Media } from "@vincero/ui/media";

const meta: Meta<typeof Media> = {
  title: "Media",
  component: Media,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

const mockImage = {
  url: "https://placehold.co/400",
  width: 400,
  height: 400,
  altText: "reprehenderit reprehenderit commodo",
  mimeType: "image/jpeg",
};

const mockItems = [
  {
    id: "1",
    ...mockImage,
    footnote: "Sit eu ex",
  },
  {
    id: "2",
    ...mockImage,
    footnote: "Pariatur reprehenderit elit deserunt",
  },
  {
    id: "3",
    ...mockImage,
    footnote: "Aute voluptate ut",
  },
  {
    id: "4",
    ...mockImage,
    footnote: "Ipsum ullamco ipsum voluptate",
  },
  {
    id: "5",
    ...mockImage,
    footnote: "Incididunt ut mollit",
  },
  {
    id: "6",
    footnote: "Excepteur mollit anim",
    ...mockImage,
  },
];

export const Default: Story = {
  args: {
    variant: "default",
    media: {
      ...mockItems[0],
      className: "h-10",
    },
  },
};

export const Gallery: Story = {
  args: {
    variant: "gallery",
    media: mockItems,
  },
};
