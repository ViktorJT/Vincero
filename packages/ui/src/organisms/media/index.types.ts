import type { AssetProps } from "../../types";

export type Props = {
  id?: string;
  fluid?: boolean;
  asset: AssetProps;
  autoplay?: string | boolean;
  className?: string;
};
