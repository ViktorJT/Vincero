import type { Meta, StoryObj } from "@storybook/react";
import { Media } from "@vincero/ui/organisms/media";

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
  },
  {
    id: "2",
    ...mockImage,
  },
  {
    id: "3",
    ...mockImage,
  },
  {
    id: "4",
    ...mockImage,
  },
  {
    id: "5",
    ...mockImage,
  },
  {
    id: "6",
    ...mockImage,
  },
];

export const Default: Story = {
  args: {
    media: {
      ...mockItems[0],
      className: "h-10",
    },
  },
};
