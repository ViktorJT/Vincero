import type { LinkProps, MediaProps } from "../../types.ts";

interface Props {
  title: string;
  subtitle: string;
  links?: LinkProps[];
  background?: MediaProps;
}

export type { Props };
