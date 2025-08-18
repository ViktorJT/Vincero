import type { RichTextType } from "../../types";

interface TextProps {
  id: string;
  title: RichTextType;
  text: RichTextType;
  dark?: boolean;
}

export type { TextProps };
