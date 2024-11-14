"use client";

import { CldImage } from "next-cloudinary";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import type { Props } from "./index.types";

export function Loading({ logoId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Replace with tailwind pulse class?
  useGSAP(
    () => {
      gsap.fromTo(
        ".loading-pulse",
        {
          opacity: 0.5,
        },
        {
          opacity: 1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 bg-white dark:bg-dark flex items-center justify-center"
    >
      <div className="loading-pulse">
        {logoId ? (
          <CldImage
            alt="Loading..."
            className="w-32 h-32 object-contain"
            height={32}
            src={logoId}
            width={32}
          />
        ) : (
          <div className="w-32 h-32 bg-light/10 dark:bg-dark/10 rounded-md" />
        )}
      </div>
    </div>
  );
}
