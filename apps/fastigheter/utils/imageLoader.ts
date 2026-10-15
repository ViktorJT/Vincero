import type { ImageLoaderProps } from "next/image";

// Serves Hygraph assets resized to the width Next.js asks for, using Hygraph's
// URL transformations instead of the original (often 4000–8000px) upload.
// Media appends `?maxw=<original width>` so images are never upscaled.
// https://hygraph.com/docs/api-reference/basics/images
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);

  if (!url.hostname.endsWith("graphassets.com")) {
    return src;
  }

  const maxWidth = Number(url.searchParams.get("maxw")) || width;
  const segments = url.pathname.split("/");
  const handle = segments.pop();

  url.search = "";
  url.pathname = [
    ...segments,
    `resize=width:${Math.min(width, maxWidth)}`,
    `quality=value:${quality ?? 75}`,
    handle,
  ].join("/");

  return url.toString();
}
