import type { MediaProps } from "../../types";

export interface PageProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: MediaProps;
}

export interface Props {
  id: string;
  title: string;
  subtitle?: string;
  pages: PageProps[];
}
