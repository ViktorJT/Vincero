import { cn } from "../../lib/utils/cn";

import { Media } from "../../molecules/media";

import type { Props } from "./index.types";

export function Profile({ name, role, image, email, className }: Props) {
  return (
    <div className={cn("flex flex-col w-[280px]", className)}>
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-md">
        <Media className="object-cover w-full h-full" media={image} />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        {role && <p className="text-muted-foreground">{role}</p>}
        {email && (
          <a
            className="text-sm text-primary hover:underline"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
