import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@vincero/ui/organisms/header";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Full: Story = {
  render: (props) => <Header {...props} />,
  name: "Full",
  args: {
    title: "Vi förvaltar våra hyresgästers förtroende",
    subtitle:
      "Kommersiella fastigheter i bra kommunikationslägen i Stockholm och Uppsala.",
    links: [
      {
        id: "df9g8dfg78adfgadf8",
        url: "/kontakt",
        displayText: "Kontakt",
        variant: "default",
        target: "self",
        titleAttribute: "Gå till Kontakt",
        ariaLabel: "Go to Contact Page",
      },
      {
        id: "fa9sd8fasdavdp98ay",
        url: "/#banner",
        displayText: "Läs mer",
        variant: "ghost",
        target: "self",
        titleAttribute: "Läs mer",
      },
    ],
    background: {
      id: "df98sfph8epferoifs89",
      url: "/placeholder-video.webm",
      mimeType: "video/webm",
      altText: "Aerial view of buildings and streets",
      width: 400,
      height: 400,
    },
  },
};

export const Minimal: Story = {
  render: (props) => <Header {...props} />,
  name: "Minimal",
  args: {
    title: "Vi förvaltar våra hyresgästers förtroende",
    subtitle:
      "Kommersiella fastigheter i bra kommunikationslägen i Stockholm och Uppsala.",
    background: {
      id: "df98sfph8epferoifs89",
      url: "/placeholder-video.webm",
      mimeType: "video/webm",
      altText: "Aerial view of buildings and streets",
      width: 400,
      height: 400,
    },
  },
};

export const Image: Story = {
  render: (props) => <Header {...props} />,
  name: "w. Image",
  args: {
    title: "Vi förvaltar våra hyresgästers förtroende",
    subtitle:
      "Kommersiella fastigheter i bra kommunikationslägen i Stockholm och Uppsala.",
    background: {
      id: "df98sfph8epferoifs89",
      url: "https://placehold.co/400",
      mimeType: "image",
      altText: "Aerial view of buildings and streets",
      width: 400,
      height: 400,
    },
  },
};

export const NoAsset: Story = {
  render: (props) => <Header {...props} />,
  name: "w/o Asset",
  args: {
    title: "Vi förvaltar våra hyresgästers förtroende",
    subtitle:
      "Kommersiella fastigheter i bra kommunikationslägen i Stockholm och Uppsala.",
  },
};
