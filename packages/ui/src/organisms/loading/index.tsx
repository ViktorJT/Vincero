"use client";

import { CldImage } from "next-cloudinary";
//import { useState, useEffect, useRef } from "react";
//import { useGSAP } from "@gsap/react";
//import gsap from "gsap";

import type { Props } from "./index.types";

export function Loading({ logoId }: Props) {
  //const ref = useRef<HTMLDivElement>(null);
  //const [isReady, setIsReady] = useState(false);
  //
  //// Initial animation timeline
  //useEffect(() => {
  //  const timeline = gsap.timeline({
  //    onComplete: () => {
  //      setIsReady(true);
  //    },
  //  });
  //
  //  // Add other animations here if needed
  //  return () => {
  //    timeline.kill();
  //  };
  //}, []);
  //
  //// Fade out animation
  //useEffect(() => {
  //  console.log("getting ready?", isReady);
  //  if (isReady) {
  //    gsap.to(ref.current, {
  //      opacity: 0,
  //      duration: 1,
  //      ease: "power2.inOut",
  //      onComplete: () => {
  //        if (ref.current) {
  //          ref.current.style.display = "none";
  //        }
  //      },
  //    });
  //  }
  //}, [isReady]);

  return (
    <div
      //ref={ref}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center"
    >
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
