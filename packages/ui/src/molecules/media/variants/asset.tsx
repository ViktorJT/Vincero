import { forwardRef } from "react";
// import Image from "next/image"; // @todo

import { isVideo } from "../../../lib/utils/isVideo";
import { cn } from "../../../lib/utils/cn";

import type { AssetProps } from "../index.types";

// @todo separate out video component so that I can colocate the intersection observer play / pause with it

export const Asset = forwardRef<HTMLVideoElement, AssetProps>(
  ({ media, className }, ref) => {
    return (
      <>
        {media.map((item) => {
          const assetStyles = cn(
            "absolute inset-0 w-full h-full object-cover",
            item.className,
          );
          return (
            <div key={item.id} className={cn("asset relative", className)}>
              {isVideo(item) ? (
                <video
                  ref={ref}
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                  autoPlay={true}
                  className={cn("video", assetStyles)}
                  src={item.url}
                />
              ) : (
                <img
                  alt={item.altText || ""}
                  className={cn("image", assetStyles)}
                  src={item.url}
                />
              )}
            </div>
          );
        })}
      </>
    );
  },
);

Asset.displayName = "Asset";
