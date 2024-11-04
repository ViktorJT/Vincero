import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@vincero/ui/text";

const meta: Meta<typeof Text> = {
  title: "Text",
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Full: Story = {
  render: (props) => <Text {...props} />,
  name: "Text",
  args: {
    metaInformation: [
      {
        id: "cm31vlc1yb5e607mhf3s4oskt",
        title: "Ort",
        paragraphs: [
          {
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
        ],
      },
      {
        id: "cm31vlc1lb5e407mhe4h631b2",
        title: "Datum",
        paragraphs: [
          {
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
          {
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
        ],
      },
      {
        id: "cm31vlc1yb5e60sdkf3s4oskt",
        paragraphs: [
          {
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
        ],
      },
    ],
  },
};
