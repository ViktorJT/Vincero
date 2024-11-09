import type { LinkProps } from "../../types";

export type Props = {
  id: string;
  contactName: string;
  contactAddress: string;
  contactPostalCode: string;
  contactCity: string;
  contactEmail: string;
  leftColumn: LinkProps[];
  rightColumn: LinkProps[];
};