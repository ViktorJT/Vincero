import type { LinkProps, MediaProps } from "../../types.ts";

export interface TextBlockProps {
  title?: string;
  heading: string;
  body: string;
  links?: LinkProps[];
  order?: number;
}

export interface MediaBlockProps {
  media: MediaProps;
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
