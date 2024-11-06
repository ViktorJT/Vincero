import type { MediaProps } from "../../types";

export interface PageProps {
  id: string;
  title: string;
  description: string;
  href: string;
  image: MediaProps;
}

export interface Props {
  title: string;
  subtitle?: string;
  pages: PageProps[];
}
