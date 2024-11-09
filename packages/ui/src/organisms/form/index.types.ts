import type { MediaProps, ParagraphProps } from "../../types.ts";

interface FieldProps {
  id: string;
  type: "text" | "textArea" | "email";
  label: string;
  placeholder?: string;
  required: boolean;
}

interface Props {
  name: string;
  image?: MediaProps;
  text?: ParagraphProps;
  fields?: FieldProps[];
  submitButtonLabel: string;
  action: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
}

export type { FieldProps, Props };
