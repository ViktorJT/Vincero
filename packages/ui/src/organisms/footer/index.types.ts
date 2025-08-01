import type { AssetProps } from "../../types";

import type { NavItemProps } from "../navigation/index.types";

export interface ValueType {
  id: string;
  title: string;
  text: string;
}

export type Props = {
  id: string;
  vinceroLogo: AssetProps;
  phone: ValueType;
  email: ValueType;
  title: string;
  links: NavItemProps[];
};
