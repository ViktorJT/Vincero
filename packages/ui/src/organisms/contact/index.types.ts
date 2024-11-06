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
}

export type { FieldProps, Props };
