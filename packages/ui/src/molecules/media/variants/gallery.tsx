"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Asset } from "./asset";
import { gsap } from "gsap";

import { cn } from "../../../lib/utils/cn";

import type { GalleryProps } from "../index.types";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function Gallery({ media = [], className }: GalleryProps) {
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
    const row = index + 1;
    const columnPattern = [1, 2, 3, 2, 1, 2];
    const column = columnPattern[index % columnPattern.length];

    return { row, column };
  };

  return (
    <div
      ref={gridRef}
      className={cn("grid w-full grid-cols-1 md:grid-cols-3 my-40", className)}
    >
      {media.map((item, index: number) => {
        const { row, column } = getGridPosition(index);
        return (
          <figure
            key={item.id}
            className="grid__item relative m-0"
            style={{
              gridColumn: `${column} / span 1`,
              gridRow: row,
            }}
          >
            <div className="grid__item-img relative overflow-hidden aspect-[3/2]">
              <Asset
                className="grid__item-img-inner w-full h-full object-cover"
                media={[item]}
              />
            </div>
            <figcaption className="grid__item-caption absolute p-2 flex flex-wrap gap-2">
              <h3 className="font-bold text-primary">{item.footnote}</h3>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
