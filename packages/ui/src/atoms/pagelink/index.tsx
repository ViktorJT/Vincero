import Link from "next/link";

import { Media } from "../../molecules/media";

import { cn } from "../../lib/utils/cn";

import type { PageLinkProps } from "./index.types";

export function PageLink({
  href,
  image,
  title,
  subtitle,
  className,
}: PageLinkProps) {
  return (
    <Link className={cn("flex flex-col w-1/3", className)} href={href}>
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-md">
        <Media className="object-cover w-full h-full" media={image} />
      </div>
      <div>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
}
