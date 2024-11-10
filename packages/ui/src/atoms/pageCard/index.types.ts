import type { MediaProps } from "../../types";

export interface Props {
  slug: string;
  id?: string;
  image: MediaProps;
  title: string;
  description: string;
  className?: string;
}
