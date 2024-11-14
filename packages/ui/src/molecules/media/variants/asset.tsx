"use client";

import { CldVideoPlayer, CldImage } from "next-cloudinary";
import { gsap } from "gsap";

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
                poster={{
                  // Sets a 1x1 transparent image as a poster bc can't disable posters for some reason
                  src: "https://res.cloudinary.com/du80x83rx/image/upload/v1731600613/nothing_qzhbfr.png",
                  format: "default",
                  quality: "default",
                }}
                seekThumbnails={false}
                showLogo={false}
                src={item.public_id}
                onPlay={({ video }: { video: HTMLVideoElement }) => {
                  if (video) {
                    gsap.to(video, {
                      opacity: 1,
                      duration: 6,
                      ease: "power3.out",
                    });
                  }
                }}
                {...item}
                id={`${item.id}-${item.public_id}-${i}`}
              />
            ) : (
              <CldImage
                {...item}
                alt={item.metadata?.alt || ""}
                className={cn("image", assetStyles)}
                src={item.public_id}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
