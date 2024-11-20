import type { AssetProps } from "../../types";

import type { NavItemProps } from "../navigation/index.types";

export type Props = {
  id: string;
  logo: AssetProps;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  copyrightInformation: string;
  leftColumn: NavItemProps[];
  rightColumn: NavItemProps[];
};
