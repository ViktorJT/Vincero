import type { RichTextType } from "../../types";

export interface Props {
  id: string;
  title: RichTextType;
  textBlocks?: Pick<RichTextType, "html">[];
}
