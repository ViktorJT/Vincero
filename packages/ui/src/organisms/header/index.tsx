"use client";

import { cn } from "../../lib/utils/cn";
import { Media } from "../../organisms/media";
import type { Props } from "./index.types.ts";

function Header({
  id,
  heading,
  subHeading,
  asset,
  fullscreen,
  assetPosition = "center",
}: Props) {
  const objectPos =
    {
      top: "object-top",
      center: "object-center",
      bottom: "object-bottom",
      left: "object-left",
      right: "object-right",
    }[assetPosition] ?? "object-center";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        fullscreen && asset ? "h-[100vh]" : "h-[80vh]",
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
          className={cn("transition-none media w-full h-full", objectPos)}
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
