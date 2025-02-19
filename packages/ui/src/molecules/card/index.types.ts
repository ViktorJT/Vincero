import type { RichTextContent } from "@graphcms/rich-text-types";

import type { LinkProps, AssetProps } from "../../types";

export interface Props {
  className?: string;
  id: string;
  fill?: true;
  truncate?: boolean;
  mediaClassName?: string;
  asset?: AssetProps;
  text: {
    raw: RichTextContent;
  };
  link?: LinkProps;
}
