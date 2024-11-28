"use client";

import { cn } from "../../lib/utils/cn";

import { Media } from "../../organisms/media";

import type { Props } from "./index.types.ts";

function Header({ id, title, subtitle, asset }: Props) {
  return (
    <section
      className={cn(
        "relative min-h-[50vh] grid grid-cols-1 place-items-start w-full overflow-hidden",
        {
          "grid-rows-4": !!asset,
          "grid-rows-1": !asset,
        },
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
          className="media place-self-end col-span-full row-span-full h-dvh w-full"
        />
      )}

      <div
        className={cn(
          "header relative col-span-full h-full w-full bg-dark text-balance flex flex-col justify-end text-light",
          {
            "row-start-1 row-end-4 md:row-end-3": !!asset,
            "row-span-full": !asset,
          },
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6 md:px-10 py-10 items-end">
          <h1 className="title text-heading-large md:text-display-large md:max-w-[640px] md:pr-10">
            {title}
          </h1>
          <p className="subtitle text-body-base md:text-body-large md:max-w-[400px]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export { Header, type Props as HeaderProps };
