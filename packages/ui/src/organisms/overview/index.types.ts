import type { Props as CardProps } from "../../molecules/card/index.types";
import type { RichTextType } from "../../types";

export type { CardProps };

export interface Props {
  id: string;
  title?: RichTextType;
  subtitle?: RichTextType;
  items: CardProps[];
}
