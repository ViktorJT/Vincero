import type { RichTextContent } from "@graphcms/rich-text-types";

export interface Props {
  title: string;
  textBlocks?: {
    raw: RichTextContent;
  }[];
}
