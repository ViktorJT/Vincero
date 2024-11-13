import Link from "next/link";

import { Asset } from "../../molecules/media/variants/asset";

import { Card, CardContent, CardFooter, CardHeader } from "../../atoms/card";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { cn } from "../../lib/utils/cn";

import type { Props } from "./index.types";

export function PageCard(page: Props) {
  const { href } = prioritiseHref({ page });

  return (
    <Card className={cn("border-0 bg-white text-dark h-full", page.className)}>
      <Link href={href}>
        <CardHeader className="p-0 relative aspect-[4/3] overflow-hidden">
          <Asset className="object-cover w-full h-full" media={[page.image]} />
        </CardHeader>
        <CardContent className="pt-2 pb-2 md:pt-3 md:pb-4 flex">
          <p className="text-body font-medium">{page.title}</p>
        </CardContent>
        <CardFooter>
          <p className="text-body line-clamp-2">{page.description}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
