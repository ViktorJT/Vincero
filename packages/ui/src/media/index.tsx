"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import type { Props } from "./index.types";

// Define the dynamic imports
const Asset = dynamic(() =>
  import("./variants/asset").then((mod) => mod.Asset),
);
const Gallery = dynamic(() =>
  import("./variants/gallery").then((mod) => mod.Gallery),
);

export function Media({ variant = "default", media = [], className }: Props) {
  // Determine the component to load based on the variant
  const Component = useRef(variant === "default" ? Asset : Gallery).current;

  return (
    <Component
      className={className}
      media={Array.isArray(media) ? media : [media]}
    />
  );
}
