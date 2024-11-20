import type { Props as CardProps } from "../../molecules/card/index.types";

export type { CardProps };

export interface Props {
  id: string;
  title: string;
  subtitle?: string;
  items: CardProps[];
}
