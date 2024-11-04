import type { RichTextContent } from "@graphcms/rich-text-types";

export interface BlockProps {
  id: string;
  title?: string;
  paragraphs?: RichTextContent[];
}

export interface TextProps {
  metaInformation?: BlockProps[];
  heading?: string;
  body: BlockProps[];
}
