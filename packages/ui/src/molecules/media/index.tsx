"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import type { Props } from "./index.types";

const Asset = dynamic(() =>
  import("./variants/asset").then((mod) => mod.Asset),
);
const Gallery = dynamic(() =>
  import("./variants/gallery").then((mod) => mod.Gallery),
);
const Mason = dynamic(() =>
  import("./variants/mason").then((mod) => mod.Mason),
);

export function Media({ variant = "default", media = [], className }: Props) {
  // Determine the component to load based on the variant
  const Component = useRef(
    variant === "default" ? Asset : variant === "gallery" ? Gallery : Mason,
  ).current;

  return (
    <Component
      className={className}
      media={Array.isArray(media) ? media : [media]}
    />
  );
}
