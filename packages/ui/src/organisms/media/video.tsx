"use client";

import { CldVideoPlayer } from "next-cloudinary";

import type { CldVideoPlayerProps } from "next-cloudinary";

// Loaded on demand by Media, so the video player's large stylesheet is only
// fetched on pages that actually show a video
import "next-cloudinary/dist/cld-video-player.css";

export default function Video(props: CldVideoPlayerProps) {
  return <CldVideoPlayer {...props} />;
}
