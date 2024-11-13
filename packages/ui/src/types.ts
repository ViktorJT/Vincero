import type { RichTextContent } from "@graphcms/rich-text-types";

import type { ButtonVariants } from "./atoms/button/index.types";
import type { ImageProps } from "next/image";

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
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}

export interface MediaProps extends ImageProps {
  id: string;
  mimeType: string;
  url: string;
  className?: string;
  metadata?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
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
