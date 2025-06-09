import type { RichTextContent } from "@graphcms/rich-text-types";
import type { ParagraphProps } from "../../types";

interface TextProps {
  id: string;
  metaInformation?: ParagraphProps[];
  accentBackground?: boolean;
  heading?: string;
  body: ParagraphProps;
}

export type { TextProps, RichTextContent, ParagraphProps };
