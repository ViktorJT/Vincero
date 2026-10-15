import type { AssetProps } from "../../types.ts";
import type { TextProps } from "../text/index.types.js";

interface FieldProps {
  id: string;
  type: "text" | "textArea" | "email";
  label: string;
  placeholder?: string;
  required: boolean;
}

interface Props {
  id: string;
  name: string;
  image?: AssetProps;
  text?: TextProps;
  fields?: FieldProps[];
  submitButtonLabel: string;
  action: string;
  contact: Record<string, Record<string, string>>;
}

export type { FieldProps, Props };
