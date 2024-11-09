import type { Meta, StoryObj } from "@storybook/react";
import { Navigation, MobileNavigation } from "@vincero/ui/organisms/navigation";

const meta: Meta<typeof Navigation> = {
  title: "Navigation",
  component: Navigation,
  args: {
    id: "cm37kqz25jgir07mjaq641dsl",
    leftColumn: [
      {
        id: "cm37kqz26jgis07mj8x9luia2",
        displayText: "Projekt",
        description:
          "Aute nisi magna nostrud dolore incididunt laboris anim eiusmod.",
        external: false,
        variant: "link",
        page: {
          title: "Ex reprehenderit dolor non",
          slug: "ex-reprehenderit-dolor-non",
        },
        subLinks: [
          {
            id: "cm37kqz26jgit07mjc9n6vksi",
            displayText: "Anchor Test",
            variant: "link",
            description:
              "Eiusmod minim ullamco qui consequat proident et anim.",
            external: false,
            anchor: "#Test",
          },
          {
            id: "cm37ksbedjh9007mjprsctg4l",
            displayText: "External Test",
            variant: "link",
            description:
              "Sint id cupidatat minim reprehenderit do amet nostrud id.",
            external: true,
            externalUrl: "https://google.com",
          },
        ],
      },
      {
        id: "cm37ksbeejh9107mjydw0suz0",
        displayText: "Test",
        variant: "link",
        external: false,
        page: {
          id: "cm34ncgi45o7u07mjxcnn8unj",
          title: "Ex reprehenderit dolor non",
        },
      },
    ],
    rightColumn: [
      {
        id: "cm37kvmzjjkzp07mhvlf0pz5f",
        displayText: "Testinggg",
        variant: "link",
        external: false,
        anchor: "#test",
      },
      {
        id: "cm37kwg05jj2x07mjq1r5zq4m",
        displayText: "Testinggg",
        variant: "link",
        external: true,
        externalUrl: "https://google.com",
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

export const Desktop: Story = {
  render: (props) => <Navigation {...props} />,
  name: "Desktop",
};

export const Mobile: Story = {
  render: (props) => <MobileNavigation {...props} />,
  name: "Mobile",
};
