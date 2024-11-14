import { cn } from "../../lib/utils/cn";

import { Card, CardContent, CardFooter, CardHeader } from "../../atoms/card";

import { Asset } from "../../molecules/media/variants/asset";

import type { Props } from "./index.types";

export function ProfileCard({ name, role, image, email, className }: Props) {
  return (
    <Card className={cn("text-dark bg-white h-full flex flex-col", className)}>
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <Asset className="object-cover w-full h-full" media={[image]} />
      </CardHeader>
      <CardContent className="p-4 flex flex-col justify-between">
        <p>{name}</p>
        <p className="text-muted truncate">{role}</p>
      </CardContent>
      {email && (
        <CardFooter className="px-4">
          <a
            className="text-muted hover:text-dark underline cursor-pointer truncate"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
