"use client";

import { CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Props } from "./index.types";
import { cn } from "../../lib/utils/cn";

const Video = dynamic(() => import("./video"), { ssr: false });

// `priority` marks above-the-fold media (e.g. the hero) so it loads first
function Media({
  id,
  autoplay = "on-scroll",
  fluid,
  asset,
  className,
  priority = false,
}: Props) {
  if (!asset) return null;

  const styles = cn(
    "transition-all relative w-full h-full object-cover md:max-h-screen",
    className,
  );

  const isDev = process.env.NODE_ENV !== "production";

  const fallbackVideo = (
    <video
      loop
      muted
      playsInline
      autoPlay={!!autoplay}
      className={styles}
      src={asset.url}
    />
  );

  // Hygraph can only resize raster formats; SVGs and GIFs are served as-is
  const resizable = /^image\/(jpe?g|png|webp)$/.test(asset.mimeType ?? "");

  const fallbackImage = (
    <Image
      alt={asset.alt || ""}
      className={styles}
      height={asset.height}
      preload={priority}
      sizes="100vw"
      src={resizable ? `${asset.url}?maxw=${asset.width}` : asset.url}
      unoptimized={!resizable}
      width={asset.width}
    />
  );

  let Component;

  if (!asset.optimised) {
    Component = asset.mimeType?.startsWith("video")
      ? fallbackVideo
      : fallbackImage;
  } else if (asset.optimised.resource_type === "video") {
    Component = (
      <Video
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
        preload={priority}
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
