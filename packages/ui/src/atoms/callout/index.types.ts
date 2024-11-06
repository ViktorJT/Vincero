import type { LinkProps } from "../../types";

export interface Props {
  id: string;
  heading: string;
  body: string;
  links?: LinkProps[];
}
