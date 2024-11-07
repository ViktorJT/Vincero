import Link from "next/link";

import { Media } from "../../molecules/media";
import { Card, CardContent, CardFooter, CardHeader } from "../../atoms/card";

import { cn } from "../../lib/utils/cn";

import type { Props } from "./index.types";

export function PageCard({
  href,
  image,
  title,
  description,
  className,
}: Props) {
  return (
    <Card className={cn("bg-white text-dark h-full", className)}>
      <Link href={href}>
        <CardHeader className="p-0 relative aspect-[4/3] overflow-hidden">
          <Media className="object-cover w-full h-full" media={image} />
        </CardHeader>
        <CardContent className="pt-6 flex justify-between gap-4">
          <p className="text-heading">{title}</p>
        </CardContent>
        <CardFooter>
          <p className="text-body">{description}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
