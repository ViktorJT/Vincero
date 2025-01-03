import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "@vincero/ui/organisms/form";

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
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

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  render: (props) => <Form {...props} />,
  name: "Form",
};
