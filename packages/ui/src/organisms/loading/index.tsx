"use client";

import { CldImage } from "next-cloudinary";

import type { Props } from "./index.types";

export function Loading({ logoId }: Props) {
  return (
    <div className="fixed h-screen w-full inset-0 bg-black flex flex-col items-center justify-center">
      <CldImage
        alt="Loading..."
        className="animate-pulse w-40 h-auto object-contain"
        height={40}
        src={logoId}
        width={40}
      />
    </div>
  );
}
