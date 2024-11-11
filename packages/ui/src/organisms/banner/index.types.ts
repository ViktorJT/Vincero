import type { RichTextContent } from "@graphcms/rich-text-types";

export interface Props {
  id: string;
  title: string;
  textBlocks?: {
    raw: RichTextContent;
  }[];
}
