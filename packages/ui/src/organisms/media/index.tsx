"use client";

import { CldVideoPlayer, CldImage } from "next-cloudinary";

import Image from "next/image";

import type { Props } from "./index.types";

import { cn } from "../../lib/utils/cn";

function Media({ id, fluid, asset, className }: Props) {
  if (!asset) return;

  const styles = cn(
    "transition-all relative w-full h-full object-cover md:max-h-screen",
    className,
  );

  const isDev = process.env.NODE_ENV !== "production";

  const handleFallback = (
    e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>,
  ) => {
    const element = e.currentTarget;
    element.src = asset.url;
  };

  let Component;

  if (!asset.optimised) {
    Component = asset.mimeType?.startsWith("video") ? (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles}
        src={asset.url}
      />
    ) : (
      <Image
        alt={asset.alt || ""}
        className={styles}
        height={asset.height}
        src={asset.url}
        width={asset.width}
      />
    );
  } else if (asset.optimised.resource_type === "video") {
    Component = (
      <CldVideoPlayer
        {...asset.optimised}
        loop
        muted
        playsinline
        autoplay="on-scroll"
        bigPlayButton={false}
        className={cn("video", styles)}
        controls={false}
        src={asset.optimised.public_id}
        onError={handleFallback}
      />
    );
  } else {
    Component = (
      <CldImage
        {...asset.optimised}
        alt={asset.alt ?? asset.optimised.metadata?.alt ?? ""}
        className={cn("image", styles)}
        src={asset.optimised.public_id}
        unoptimized={isDev}
        onError={handleFallback}
      />
    );
  }

  return (
    <div className={cn("asset relative", { fluid }, className)} id={id}>
      {Component}
    </div>
  );
}

export { Media, type Props as MediaProps };
