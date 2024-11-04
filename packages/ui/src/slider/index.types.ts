import type { LinkProps, MediaProps } from "../types.ts";

interface SlideBlock {
  id: string;
  title?: string;
  heading: string;
  body: string;
  links?: LinkProps[];
  media: MediaProps;
}

export interface Props {
  blocks: SlideBlock[];
}
