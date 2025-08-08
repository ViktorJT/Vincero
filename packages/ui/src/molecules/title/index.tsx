import { cn } from "../../lib/utils/cn";

import type { Props } from "./index.types";

export function Title({ title, subtitle, className }: Props) {
  if (!title && !subtitle) {
    return null;
  }

  return (
    <div
      className={cn(
        "max-w-[540px] md:max-w-none text-dark text-pretty grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 mb-10 md:mb-12",
        className,
      )}
    >
      {title && (
        <div
          dangerouslySetInnerHTML={{ __html: title.html }}
          className="flex-1 md:pr-6 -mt-1 text-heading-large md:text-display"
        />
      )}
      {subtitle && (
        <div
          dangerouslySetInnerHTML={{ __html: subtitle.html }}
          className="flex-1 text-body space-y-2 md:space-y-4"
        />
      )}
    </div>
  );
}
