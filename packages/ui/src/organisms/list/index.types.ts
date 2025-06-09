import type { LinkProps } from "../../types";

export type ListItem = {
  id: string;
  title: string;
  body: string;
  date: Date;
  link: LinkProps;
};

export type ListProps = {
  moreLabel: string;
  lessLabel: string;
  items: ListItem[];
};
