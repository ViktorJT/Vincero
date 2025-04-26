"use client";

import { CldVideoPlayer, CldImage } from "next-cloudinary";
import Image from "next/image";
import type { Props } from "./index.types";
import { cn } from "../../lib/utils/cn";

function Media({ id, autoplay = "on-scroll", fluid, asset, className }: Props) {
  if (!asset) return null;

  const styles = cn(
    "transition-all relative w-full h-full object-cover md:max-h-screen",
    className,
  );

  const isDev = process.env.NODE_ENV !== "production";

  const FallbackVideo = () => (
    <video
      loop
      muted
      playsInline
      autoPlay={!!autoplay}
      className={styles}
      src={asset.url}
    />
  );

  const FallbackImage = () => (
    <Image
      alt={asset.alt || ""}
      className={styles}
      height={asset.height}
      src={asset.url}
      width={asset.width}
    />
  );

  let Component;

  if (!asset.optimised) {
    Component = asset.mimeType?.startsWith("video") ? (
      <FallbackVideo />
    ) : (
      <FallbackImage />
    );
  } else if (asset.optimised.resource_type === "video") {
    Component = (
      <CldVideoPlayer
        {...asset.optimised}
        loop
        muted
        playsinline
        autoplay={autoplay}
        bigPlayButton={false}
        className={cn("video", styles)}
        controls={false}
        src={asset.optimised.public_id}
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
