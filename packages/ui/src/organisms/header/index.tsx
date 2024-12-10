"use client";

import { cn } from "../../lib/utils/cn";
import { Media } from "../../organisms/media";
import type { Props } from "./index.types.ts";

function Header({ id, title, subtitle, asset }: Props) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        asset ? "h-[100dvh]" : "min-h-[64dvh]",
      )}
      id={id}
    >
      {asset && (
        <Media
          autoplay
          fluid
          asset={{
            ...asset,
            className: "absolute inset-0 w-full h-full object-cover",
          }}
          className="media w-full h-full"
        />
      )}

      <div
        className={cn(
          "absolute inset-0 flex flex-col p-6 md:p-10 text-light",
          subtitle ? "justify-end" : "justify-center items-center",
        )}
      >
        <div
          className={cn(
            "max-w-[640px]",
            !subtitle && "max-w-[800px] text-center",
          )}
        >
          <h1
            className={cn(
              "text-heading-large md:text-display-large",
              subtitle && "mb-6",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-body md:text-body-large text-light max-w-[500px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export { Header, type Props as HeaderProps };
