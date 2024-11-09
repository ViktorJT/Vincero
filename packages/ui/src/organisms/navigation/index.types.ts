import type { LinkProps } from "../../types";

export type Props = {
  id?: string;
  className?: string;
  leftColumn: LinkProps[];
  rightColumn: LinkProps[];
};

export type ColumnProps = {
  links: LinkProps[];
};
