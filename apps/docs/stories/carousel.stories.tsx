import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "@vincero/ui/carousel";

const meta: Meta<typeof Carousel> = {
  title: "Carousel",
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockImage = {
  url: "https://placehold.co/400",
  id: "df98sfph8epferoifs89",
  width: 400,
  height: 400,
  mimeType: "image",
};

const mockProfiles = [
  {
    id: "1",
    name: "Robin Rutuli",
    role: "VD/Grundare",
    image: mockImage,
    email: "robin@example.com",
  },
  {
    id: "2",
    name: "Andreas Rutuli",
    role: "Ordförande/Grundare",
    image: mockImage,
    email: "andreas@example.com",
  },
  {
    id: "3",
    name: "Henrik Buss",
    role: "Fastighetschef",
    image: mockImage,
    email: "henrik@example.com",
  },
  {
    id: "4",
    name: "Emma Larsson",
    role: "Projektledare",
    image: mockImage,
    email: "emma@example.com",
  },
  {
    id: "5",
    name: "Karl Svensson",
    role: "Arkitekt",
    image: mockImage,
    email: "karl@example.com",
  },
];

const mockPages = [
  {
    id: "1",
    title: "Excepteur labore cillum",
    subtitle:
      "Aute proident irure voluptate occaecat aute dolore elit nisi quis cillum ad sint.",
    image: mockImage,
    href: "google.com",
  },
  {
    id: "2",
    title: "Laborum ut ut",
    subtitle: "Non anim culpa anim veniam duis.",
    image: mockImage,
    href: "google.com",
  },
  {
    id: "3",
    title: "Lorem deserunt in nostrud",
    subtitle: "Laboris mollit laborum amet incididunt est elit laborum.",
    image: mockImage,
    href: "google.com",
  },
  {
    id: "4",
    image: mockImage,
    title: "Labore exercitation aute",
    subtitle:
      "Duis amet pariatur ex veniam quis et magna incididunt cupidatat aute consectetur incididunt dolore ipsum Lorem.",
    href: "google.com",
  },
  {
    id: "5",
    image: mockImage,
    title: "Pariatur enim ex excepteur",
    subtitle:
      "Duis consequat consequat aliqua excepteur enim aute consequat qui in magna enim minim Lorem occaecat.",
    href: "google.com",
  },
];

export const Team: Story = {
  args: {
    title: "Vårt Team",
    subtitle:
      "Fugiat enim nisi tempor consequat eiusmod do officia exercitation ut commodo id elit.",
    items: mockProfiles,
    variant: "team",
  },
};

export const Page: Story = {
  args: {
    title: "Våra Projekt",
    subtitle:
      "Fugiat enim nisi tempor consequat eiusmod do officia exercitation ut commodo id elit.",
    items: mockPages,
    variant: "page",
  },
};
