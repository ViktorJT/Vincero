import type { AssetProps, LinkProps, RichTextType } from "../../types.ts";

interface Props {
  id: string;
  heading: RichTextType;
  subHeading: RichTextType;
  links?: LinkProps[];
  asset?: AssetProps;
}

export type { Props };
