import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@vincero/ui/slider";

const meta: Meta<typeof Slider> = {
  title: "Slider",
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Slider {...props} />,
  name: "Slider",
  args: {
    blocks: [
      {
        id: "cm31qzwo4a4jw07mj9b4d0gjt",
        title: "Lokaler",
        heading: "Vi skapar utrymme för att din vision ska förverkligas.",
        body: "Med fokus på långsiktiga relationer, anpassningsförmåga och kundanpassade lösningar, strävar vi efter att vara mer än bara en hyresvärd – vi är en partner i dina framgångar.",
        links: [
          {
            id: "cm31qzwo5a4jx07mj2da5jrqa",
            url: "blabla",
            displayText: "Våra Lokaler",
          },
        ],
        media: {
          mimeType: "video/webm",
          url: "/placeholder-video.webm",
        },
      },
      {
        id: "cm31qzwo7a4jz07mje19mcl8u",
        title: "Bostäder",
        heading: "Din framtid börjar i våra hem.",
        body: "Vi bygger bostäder med omtanke för både människor och miljö. Våra projekt präglas av smarta lösningar vilket skapar trivsamma och funktionella hem för alla livsstilar.",
        links: [
          {
            id: "cm31qzwo7a4k007mj901spfil",
            url: "blabla",
            displayText: "Våra Lokaler",
          },
          {
            id: "cm31qzwo7a4k107mjz7sy5nrg",
            url: "blabla",
            displayText: "Våra Lokaler",
          },
        ],
        media: {
          mimeType: "video/webm",
          url: "/placeholder-video.webm",
        },
      },
    ],
  },
};
