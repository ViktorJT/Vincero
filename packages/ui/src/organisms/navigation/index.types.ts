import type { AssetProps, LinkProps } from "../../types";

export type { LinkProps, AssetProps };

export type NavItemProps = {
  __typename: string;
  id: string;
  menuLink: LinkProps;
  subMenuLinks?: LinkProps[];
};

export type Props = {
  id?: string;
  className?: string;
  logo: AssetProps;
  leftColumn: NavItemProps[];
  rightColumn: NavItemProps[];
};

export type MobileMenuProps = {
  isOpen: boolean;
  navItems: NavItemProps[];
  onClose: () => void;
};
