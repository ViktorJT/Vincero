"use client";

import { useRef } from "react";

import type { Props } from "./index.types";

import { Asset } from "./variants/asset";
import { Gallery } from "./variants/gallery";

function Media({ variant = "default", media = [], className }: Props) {
  const Component = useRef(variant === "default" ? Asset : Gallery).current;

  return (
    <Component
      className={className}
      media={Array.isArray(media) ? media : [media]}
    />
  );
}

export { Media, type Props as MediaProps };
