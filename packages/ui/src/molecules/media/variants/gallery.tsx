"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import { Asset } from "./asset";
import { gsap } from "gsap";

import { cn } from "../../../lib/utils/cn";

import type { GalleryProps } from "../index.types";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function Gallery({ media = [], className }: GalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Debounced resize listener for mobile detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let resizeTimeout;

    const handleResize = (event: MediaQueryListEvent) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(event.matches);
      }, 200);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Initialize GSAP animations with optimized settings
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const gridItems = gridRef.current.querySelectorAll(".grid__item");

      gridItems.forEach((item) => {
        const previousElementSibling =
          item.previousElementSibling as HTMLElement;
        const isLeftSide =
          previousElementSibling &&
          item.getBoundingClientRect().left +
            item.getBoundingClientRect().width <=
            previousElementSibling.getBoundingClientRect().left + 1;
        const originX = isLeftSide ? 100 : 0;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "clamp(top bottom-=25%)",
              end: "clamp(+=100%)",
              scrub: true,
              invalidateOnRefresh: true, // Ensures recalculations on resize
            },
          })
          .fromTo(
            item.querySelector(".grid__item-img"),
            {
              scale: 0,
              transformOrigin: `${originX}% 0%`,
              willChange: "transform, opacity", // Hinting browser for optimization
            },
            {
              scale: 1,
              ease: "power4",
              autoAlpha: 1, // Uses GSAP’s `autoAlpha` for performance
            },
          )
          .fromTo(
            item.querySelector(".grid__item-img-inner"),
            {
              scale: 5,
              transformOrigin: `${originX}% 0%`,
              willChange: "transform, opacity",
            },
            {
              scale: 1,
              ease: "power4",
              autoAlpha: 1,
            },
            0,
          );
      });
    },
    { dependencies: [media], scope: gridRef },
  );

  // Determine grid position based on device type
  const getGridPosition = (index: number) => {
    if (isMobile) {
      return { row: index + 1, column: 1 };
    }

    const row = index + 1;
    const columnPattern = [1, 2, 3, 2, 1, 2];
    const column = columnPattern[index % columnPattern.length];

    return { row, column };
  };

  return (
    <div
      ref={gridRef}
      className={cn(
        "dark:bg-dark bg-white grid w-full grid-cols-1 md:grid-cols-3",
        className,
      )}
    >
      {media.map((item, index: number) => {
        const { row, column } = getGridPosition(index);
        return (
          <figure
            key={item.id}
            className="grid__item relative m-0"
            style={{
              gridColumn: `${column} / span 1`,
              gridRow: `${row} / span 1`,
            }}
          >
            <div
              className="grid__item-img relative overflow-hidden"
              style={{
                aspectRatio: item.width / item.height,
                willChange: "transform, opacity",
              }}
            >
              <Asset
                className="grid__item-img-inner w-full h-full object-cover"
                media={[item]}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
