import type { LinkProps } from "../../types";

export type ListItem = {
  id: string;
  title: string;
  body: string;
  link: LinkProps;
};

export type ListProps = {
  items: ListItem[];
};
