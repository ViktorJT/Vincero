import { cn } from "../../lib/utils/cn";

import { Card, CardContent, CardFooter, CardHeader } from "../../atoms/card";

import { Media } from "../../molecules/media";

import type { Props } from "./index.types";

export function ProfileCard({ name, role, image, email, className }: Props) {
  return (
    <Card className={cn("text-dark bg-white", className)}>
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <Media className="object-cover w-full h-full" media={image} />
      </CardHeader>
      <CardContent className="pt-6 flex justify-between gap-4">
        <p>{name}</p>
        <p className="text-muted">{role}</p>
      </CardContent>
      {email && (
        <CardFooter>
          <a
            className="text-muted hover:text-dark underline cursor-pointer hover:"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </CardFooter>
      )}
    </Card>
  );
}