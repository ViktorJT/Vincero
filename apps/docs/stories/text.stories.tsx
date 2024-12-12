import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@vincero/ui/organisms/text";

const meta: Meta<typeof Text> = {
  title: "Text",
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Header: Story = {
  render: (props) => <Text {...props} />,
  name: "Header",
  args: {
    metaInformation: [
      {
        id: "cm31vlc1yb5e607mhf3s4oskt",
        title: "Ort",
        paragraphs: [
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Uppsala",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "cm31vlc1lb5e407mhe4h631b2",
        title: "Datum",
        paragraphs: [
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Juli, 2021",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
    heading: "Senapsfabriken",
    body: [
      {
        id: "a3klj3h5l23k4jh523l4kjh5",
        title: "Om Projektet",
        paragraphs: [
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "År 2013 förvärvade Vincero Bostad och Magnolia Bostad gemensamt fastigheten för den gamla Slotts senapsfabrik på Kungsgatan i centrala Uppsala. ",
                    },
                  ],
                },
              ],
            },
          },
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Detta markerar starten på en omfattande omvandling av stadsdelen Kungsängen från ett industriområde till ett attraktivt bostadsområde med tre kvarter och 1 800 hyres- och bostadsrätter.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "cm31vlc1yb5e60sdkf3s4oskt",
        paragraphs: [
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Projektet, i samarbete med JM och SEB Trygg Liv, planerar inflyttningar mellan 2019 och 2020. ",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Senapsfabriken erbjuder moderna och funktionella bostäder med närhet till resecentrum samt snabb tillgång till både Stockholm och Arlanda.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

export const Paragraph: Story = {
  render: (props) => <Text {...props} />,
  name: "Header",
  args: {
    body: [
      {
        id: "a3klj3h5l23k4jh523l4kjh5",
        title: "Om Projektet",
        paragraphs: [
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "År 2013 förvärvade Vincero Bostad och Magnolia Bostad gemensamt fastigheten för den gamla Slotts senapsfabrik på Kungsgatan i centrala Uppsala. ",
                    },
                  ],
                },
              ],
            },
          },
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Detta markerar starten på en omfattande omvandling av stadsdelen Kungsängen från ett industriområde till ett attraktivt bostadsområde med tre kvarter och 1 800 hyres- och bostadsrätter.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "cm31vlc1yb5e60sdkf3s4oskt",
        paragraphs: [
          {
            raw: {
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Projektet, i samarbete med JM och SEB Trygg Liv, planerar inflyttningar mellan 2019 och 2020. ",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "Senapsfabriken erbjuder moderna och funktionella bostäder med närhet till resecentrum samt snabb tillgång till både Stockholm och Arlanda.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
};
