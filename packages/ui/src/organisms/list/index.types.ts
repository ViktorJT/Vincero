import type { LinkProps, RichTextType } from "../../types";

export type ListItem = {
  id: string;
  title: string;
  body: string;
  date: Date;
  link: LinkProps;
};

export type ListProps = {
  id: string;
  title?: RichTextType;
  subtitle?: RichTextType;
  moreLabel: string;
  lessLabel: string;
  items: ListItem[];
};
