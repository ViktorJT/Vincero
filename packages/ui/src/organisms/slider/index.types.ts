import type { LinkProps, AssetProps, RichTextType } from "../../types.ts";

export interface TextBlockProps {
  title: RichTextType;
  text: RichTextType;
  links?: LinkProps[];
}

interface SlideBlock extends TextBlockProps {
  asset: AssetProps;
  id?: string;
}

export interface Props {
  id: string;
  blocks: SlideBlock[];
}
