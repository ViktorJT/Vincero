"use client";

import { cn } from "../../lib/utils/cn";
import { Media } from "../../organisms/media";
import type { Props } from "./index.types.ts";

function Header({
  id,
  heading,
  headingAlignment,
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

  const textAlign =
    {
      left: "text-left",
      center: "text-center self-center",
      right: "text-right self-end mb-40",
    }[headingAlignment] ?? "text-center self-end";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-dark",
        fullscreen ? "h-[100vh]" : "h-[80vh]",
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
          "absolute max-h-[100svh] inset-0 flex flex-col justify-center p-6 md:py-10 md:px-20 text-white",
        )}
      >
        <div
          dangerouslySetInnerHTML={{ __html: heading.html }}
          className={cn(
            "text-balance drop-shadow-xl max-w-[720px] text-display-large",
            textAlign,
          )}
        />
      </div>
    </section>
  );
}

export { Header, type Props as HeaderProps };
