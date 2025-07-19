import type { LinkProps, AssetProps, RichTextType } from "../../types";

type BaseProps = {
  asset?: AssetProps;
  className?: string;
  id: string;
  link?: LinkProps;
};

export type DefaultCardProps = {
  __typename: "DefaultCard";
  text: RichTextType;
};

export type UnitCardProps = {
  __typename: "UnitCard";
  subtitle: string;
  title: string;
  information: {
    title: string;
    text: string;
    id: string;
  }[];
};

export type TeamCardProps = {
  __typename: "TeamCard";
  text: RichTextType;
  email?: string;
};

export type Props =
  | (BaseProps & DefaultCardProps)
  | (BaseProps & UnitCardProps)
  | (BaseProps & TeamCardProps);
