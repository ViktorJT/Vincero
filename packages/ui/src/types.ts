import type { RichTextContent } from "@graphcms/rich-text-types";

import type { ButtonVariants } from "./atoms/button/index.types";

export interface PageProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: MediaProps;
  parentPage?: PageProps;
}

export interface LinkProps {
  id?: string;
  displayText: string;
  description?: string;
  variant: ButtonVariants["variant"];
  external: boolean;
  page?: PageProps;
  externalUrl?: string;
  subLinks?: LinkProps[];
  anchor?: string;
  relAttribute?: string;
  titleAttribute?: string;
  ariaLabel?: string;
  href?: string;
}

export interface MediaProps {
  id: string;
  altText?: string | null;
  mimeType: string;
  url: string;
  width: number;
  height: number;
  footnote?: string;
  className?: string;
}

export interface ProfileProps {
  id: string;
  name: string;
  role: string;
  image: MediaProps;
  email?: string;
}

export interface ParagraphProps {
  id: string;
  title?: string;
  paragraphs?: {
    raw: RichTextContent;
  }[];
}
