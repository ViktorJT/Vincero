"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Asset } from "./asset";
import { gsap } from "gsap";

import { cn } from "../../../lib/utils/cn";

import type { MasonProps } from "../index.types";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function Mason({ media = [], className }: MasonProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
    });

    const scrollFn = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);

    // Update ScrollTrigger on Lenis scroll
    lenisRef.current.on("scroll", ScrollTrigger.update);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const gridItems = gridRef.current.querySelectorAll(".grid__item");

      gridItems.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              end: "top center",
              scrub: true,
            },
          },
        );
      });
    },
    { dependencies: [media], scope: gridRef },
  );

  const getGridPosition = (index: number) => {
    const row = Math.floor(index / 3) * 2 + 1;
    const column = (index % 3) * 2 + 1;
    const span = index % 3 === 1 ? 2 : 1;

    return { row, column, span };
  };

  return (
    <div
      ref={gridRef}
      className={cn("grid w-full grid-cols-6 gap-4 my-40", className)}
    >
      {media.map((item, index) => {
        const { row, column, span } = getGridPosition(index);
        return (
          <figure
            key={item.id}
            className="grid__item relative m-0"
            style={{
              gridColumn: `${column} / span ${span}`,
              gridRow: `${row} / span ${span}`,
            }}
          >
            <div
              className={`relative overflow-hidden ${span === 2 ? "aspect-square" : "aspect-[3/4]"}`}
            >
              <Asset className="w-full h-full object-cover" media={[item]} />
            </div>
            {item.footnote && (
              <figcaption className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white">
                {item.footnote}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
