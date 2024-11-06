import type { Meta, StoryObj } from "@storybook/react";
import { Overview } from "@vincero/ui/organisms/overview";

const meta: Meta<typeof Overview> = {
  title: "Overview",
  component: Overview,
};

export default meta;
type Story = StoryObj<typeof Overview>;

const mockImage = {
  id: "1",
  url: "https://placehold.co/400",
  width: 600,
  height: 400,
  mimeType: "image/jpeg",
  altText: "Property exterior view",
};

export const Default: Story = {
  args: {
    title: "Kommande projekt",
    subtitle:
      "Ex enim veniam adipisicing aliqua in velit ipsum officia aliquip.",
    pages: [
      {
        id: "2",
        title: "Senapsfabriken",
        description:
          "Proident ad commodo nisi eu qui et cillum deserunt labore consequat ut labore aliqua.",
        href: "/projekt/senapsfabriken",
        image: mockImage,
      },
      {
        id: "3",
        title: "Kungsängen",
        description: "Elit nisi quis cillum ad sint deserunt labore consequat.",
        href: "/projekt/kungsangen",
        image: mockImage,
      },
      {
        id: "4",
        title: "Uppsala Centrum",
        description: "Commodo nisi eu qui et cillum deserunt labore consequat.",
        href: "/projekt/uppsala-centrum",
        image: mockImage,
      },
      {
        id: "5",
        title: "Excepteur labore cillum",
        description:
          "Aute proident irure voluptate occaecat aute dolore elit nisi quis cillum ad sint.",
        image: mockImage,
        href: "google.com",
      },
      {
        id: "6",
        title: "Laborum ut ut",
        description: "Non anim culpa anim veniam duis.",
        image: mockImage,
        href: "google.com",
      },
      {
        id: "7",
        title: "Lorem deserunt in nostrud",
        description: "Laboris mollit laborum amet incididunt est elit laborum.",
        image: mockImage,
        href: "google.com",
      },
      {
        id: "8",
        image: mockImage,
        title: "Labore exercitation aute",
        description:
          "Duis amet pariatur ex veniam quis et magna incididunt cupidatat aute consectetur incididunt dolore ipsum Lorem.",
        href: "google.com",
      },
      {
        id: "9",
        image: mockImage,
        title: "Pariatur enim ex excepteur",
        description:
          "Duis consequat consequat aliqua excepteur enim aute consequat qui in magna enim minim Lorem occaecat.",
        href: "google.com",
      },
      {
        id: "10",
        image: mockImage,
        title: "Pariatur enim ex excepteur",
        description:
          "Duis consequat consequat aliqua excepteur enim aute consequat qui in magna enim minim Lorem occaecat.",
        href: "google.com",
      },
      {
        id: "11",
        image: mockImage,
        title: "Pariatur enim ex excepteur",
        description:
          "Duis consequat consequat aliqua excepteur enim aute consequat qui in magna enim minim Lorem occaecat.",
        href: "google.com",
      },
      {
        id: "12",
        image: mockImage,
        title: "Pariatur enim ex excepteur",
        description:
          "Duis consequat consequat aliqua excepteur enim aute consequat qui in magna enim minim Lorem occaecat.",
        href: "google.com",
      },
    ],
  },
};
