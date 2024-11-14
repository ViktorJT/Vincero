"use client";

import { CldVideoPlayer, CldImage } from "next-cloudinary";

import { cn } from "../../../lib/utils/cn";

export function Asset({ media, className }) {
  return (
    <>
      {media.map((item, i: number) => {
        const assetStyles = cn(
          "relative w-full h-full object-cover md:max-h-screen",
          item.className,
        );
        return (
          <div
            key={item.id}
            className={cn("asset relative", { fluid: item.fluid }, className)}
          >
            {item.resource_type === "video" ? (
              <CldVideoPlayer
                allowUsageReport={false}
                autoplay="on-scroll"
                bigPlayButton={false}
                className={cn("video", !item.fluid && assetStyles)}
                controls={false}
                fluid={false}
                loop={true}
                muted={true}
                playsInline={true}
                seekThumbnails={false}
                showLogo={false}
                src={item.public_id}
                {...item}
                id={`${item.id}-${item.public_id}-${i}`}
              />
            ) : (
              <CldImage
                {...item}
                alt={item.metadata?.alt || ""}
                className={cn("video", assetStyles)}
                src={item.public_id}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
