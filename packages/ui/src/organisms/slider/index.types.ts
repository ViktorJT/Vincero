import type { LinkProps, AssetProps } from "../../types.ts";

export interface TextBlockProps {
  title?: string;
  heading: string;
  body: string;
  links?: LinkProps[];
  order?: number;
}

interface MediaBlockProps {
  asset: AssetProps;
  order?: number;
}

export type Column = Array<MediaBlockProps | TextBlockProps>;

interface SlideBlock extends TextBlockProps, MediaBlockProps {
  id?: string;
}

export interface Props {
  id: string;
  blocks: SlideBlock[];
}
