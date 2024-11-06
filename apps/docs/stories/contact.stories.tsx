import type { Meta, StoryObj } from "@storybook/react";
import { Contact } from "@vincero/ui/organisms/contact";

const meta: Meta<typeof Contact> = {
  title: "Contact",
  component: Contact,
  args: {
    name: "Kontakt",
    image: {
      id: "cm34mlw4t5ahd07l1blac5kme",
      altText: null,
      mimeType: "image/jpeg",
      url: "https://placehold.co/400",
      width: 1080,
      height: 724,
    },
    text: {
      id: "4oiu35y349ty340tr93yu4",
      title: "Kontakt",
      paragraphs: [
        {
          children: [
            {
              type: "paragraph",
              children: [
                {
                  text: "Reprehenderit commodo ullamco duis quis pariatur adipisicing aliquip aliquip tempor laboris nisi proident commodo.",
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
                  text: "Excepteur mollit aliqua adipisicing qui reprehenderit sunt ipsum nisi culpa ex sit consectetur aute.",
                },
              ],
            },
          ],
        },
      ],
    },
    fields: [
      {
        id: "cm34xtxs08ess07mjlxyzu96l",
        type: "text",
        label: "Namn",
        required: true,
      },
      {
        id: "cm34xtxrz8esq07mj6a8p0u0a",
        type: "email",
        label: "Email",
        required: true,
      },
      {
        id: "cm34xtxry8eso07mj8by9u4nw",
        type: "textArea",
        label: "Meddelande",
        required: false,
      },
    ],
    submitButtonLabel: "Submit",
    action: "aaa",
  },
};

export default meta;

type Story = StoryObj<typeof Contact>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Contact {...props} />,
  name: "Contact",
};
