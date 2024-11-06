import type { MediaProps } from "../../types";

export interface PageLinkProps {
  href: string;
  id: string;
  image: MediaProps;
  title: string;
  subtitle: string;
  className?: string;
}
