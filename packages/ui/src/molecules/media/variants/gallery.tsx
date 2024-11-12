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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Add listener for changes
    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

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
            },
          })
          .fromTo(
            item.querySelector(".grid__item-img"),
            {
              scale: 0,
              transformOrigin: `${originX}% 0%`,
            },
            {
              scale: 1,
              ease: "power4",
            },
          )
          .fromTo(
            item.querySelector(".grid__item-img-inner"),
            {
              scale: 5,
              transformOrigin: `${originX}% 0%`,
            },
            {
              scale: 1,
              ease: "power4",
            },
            0,
          )
          .fromTo(
            item.querySelector(".grid__item-caption"),
            {
              xPercent: isLeftSide ? 20 : -20,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,
              ease: "power1",
            },
            0,
          );
      });
    },
    { dependencies: [media], scope: gridRef },
  );

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
              style={{ aspectRatio: item.width / item.height }}
            >
              <Asset
                className="grid__item-img-inner w-full h-full object-cover"
                media={[item]}
              />
            </div>
            <figcaption className="grid__item-caption absolute p-2 flex flex-wrap gap-2">
              <h3 className="font-bold dark:text-light text-dark">
                {item.footnote}
              </h3>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
