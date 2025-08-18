import type { AssetProps, LinkProps, RichTextType } from "../../types.ts";

interface Props {
  id: string;
  heading: RichTextType;
  subHeading: RichTextType;
  links?: LinkProps[];
  asset?: AssetProps;
  fullscreen: boolean;
  assetPosition?: "top" | "center" | "bottom" | "left" | "right";
}

export type { Props };
