import type { RichTextContent } from "@graphcms/rich-text-types";
import type { RichTextType } from "../../types";

export interface Props {
  id: string;
  title: RichTextType;
  textBlocks?: {
    raw: RichTextContent;
  }[];
}
