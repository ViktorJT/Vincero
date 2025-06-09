import type { AssetProps, LinkProps } from "../../types";

export type { LinkProps };

export type NavItemProps = {
  __typename: string;
  id: string;
  menuLink: LinkProps;
  subMenuLinks?: LinkProps[];
};

export type BackdropProps = {
  show: boolean;
  onClose: () => void;
};

export type ToggleProps = {
  hasScrolled: boolean;
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

export type Props = {
  id?: string;
  className?: string;
  logoLight: AssetProps;
  logoDark: AssetProps;
  leftColumn: NavItemProps[];
  rightColumn: NavItemProps[];
};

export type SlideMenuProps = {
  isOpen: boolean;
  navItems: NavItemProps[];
  onClose: () => void;
};
