import type { RichTextContent } from "@graphcms/rich-text-types";
import type { LinkProps } from "next/link";

import type { AssetProps } from "../../types";

export interface Props {
  className?: string;
  id: string;
  asset?: AssetProps;
  text: {
    raw: RichTextContent;
  };
  aspectRatio?: string;
  link?: LinkProps;
}
