"use client";

import { cn } from "../../lib/utils/cn";
import { Media } from "../../organisms/media";
import type { Props } from "./index.types.ts";

function Header({ id, heading, subHeading, asset }: Props) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        asset ? "h-[100vh]" : "min-h-[64vh]",
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
          "absolute max-h-[100svh] inset-0 flex flex-col p-6 md:py-10 md:px-20 text-white",
          subHeading?.text
            ? "mb-14 md:mb-[6rem] justify-end"
            : "justify-center items-center",
        )}
      >
        <div
          className={cn(
            "drop-shadow-xl max-w-[720px]",
            !subHeading?.text && "max-w-[800px] text-center",
          )}
        >
          <div
            dangerouslySetInnerHTML={{ __html: heading.html }}
            className={cn(
              "text-display-large",
              subHeading?.text
                ? "mb-6 md:text-display-large"
                : "md:text-display-huge",
            )}
          />

          {subHeading?.text && (
            <div
              dangerouslySetInnerHTML={{ __html: subHeading?.html }}
              className="text-body lg:text-body-large text-white max-w-[500px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export { Header, type Props as HeaderProps };
