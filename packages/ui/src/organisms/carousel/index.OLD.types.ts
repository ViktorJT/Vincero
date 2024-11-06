import type { ProfileProps } from "../../types";
import type { PageLinkProps } from "../../atoms/pagelink/index.types";

interface Props {
  title: string;
  subtitle?: string;
  items: ProfileProps[] | PageLinkProps[];
  variant?: "team" | "page";
}

export type { Props, ProfileProps, PageLinkProps };
