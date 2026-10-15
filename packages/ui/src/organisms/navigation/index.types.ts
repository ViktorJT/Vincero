import type { AssetProps, LinkProps } from "../../types";

export type { LinkProps };

export type NavItemProps = {
  __typename: string;
  id: string;
  menuLink: LinkProps;
  subMenuLinks?: (Pick<LinkProps, "id" | "displayText"> & {
    anchor: string;
  })[];
};

export type Props = {
  id?: string;
  className?: string;
  logo: AssetProps;
  links: NavItemProps[];
};
