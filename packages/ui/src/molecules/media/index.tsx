"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import type { Props } from "./index.types";

import { Asset } from "./variants/asset";
import { Gallery } from "./variants/gallery";

//const Asset = dynamic(() =>
//  import("./variants/asset").then((mod) => mod.Asset),
//);
//const Gallery = dynamic(() =>
//  import("./variants/gallery").then((mod) => mod.Gallery),
//);

function Media({ variant = "default", media = [], className }: Props) {
  // Determine the component to load based on the variant
  const Component = useRef(variant === "default" ? Asset : Gallery).current;

  return (
    <Component
      className={className}
      media={Array.isArray(media) ? media : [media]}
    />
  );
}

export { Media, type Props as MediaProps };
