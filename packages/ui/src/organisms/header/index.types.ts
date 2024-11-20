import type { AssetProps, LinkProps } from "../../types.ts";

interface Props {
  id: string;
  title: string;
  subtitle: string;
  links?: LinkProps[];
  asset?: AssetProps;
}

export type { Props };
