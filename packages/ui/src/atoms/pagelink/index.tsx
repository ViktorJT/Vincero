import { Media } from "../../media";

import { cn } from "../../../lib/utils";

import type { PageLinkProps } from "./index.types";

export function PageLink({ image, title, subtitle, className }: PageLinkProps) {
  return (
    <div className={cn("", className)}>
      <Media media={image} variant="default" />
      <p>{title}</p>
      <p>{subtitle}</p>
    </div>
  );
}
