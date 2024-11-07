import type { MediaProps } from "../../types";

export interface Props {
  href: string;
  id?: string;
  image: MediaProps;
  title: string;
  description: string;
  className?: string;
}
