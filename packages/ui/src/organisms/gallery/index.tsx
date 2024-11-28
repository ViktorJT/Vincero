"use client";

import { useState, useEffect } from "react";

import { Media } from "../../organisms/media";

import { cn } from "../../lib/utils/cn";

import type { Props } from "./index.types";

function Gallery({ id, assets = [], className }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  // Debounced resize listener for mobile detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let resizeTimeout: ReturnType<typeof setTimeout>;

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
      className={cn(
        "dark:bg-dark bg-white grid w-full grid-cols-1 md:grid-cols-3",
        className,
      )}
      id={id}
    >
      {assets.map((asset, index: number) => {
        const { row, column } = getGridPosition(index);
        return (
          <figure
            key={asset.id}
            className="grid__item relative m-0"
            style={{
              gridColumn: `${column} / span 1`,
              gridRow: `${row} / span 1`,
            }}
          >
            <div
              className="grid__item-img relative overflow-hidden"
              style={{
                aspectRatio:
                  asset.width && asset.height
                    ? `${asset.width} / ${asset.height}`
                    : "auto",
                willChange: "transform, opacity",
              }}
            >
              <Media
                asset={asset}
                className="grid__item-img-inner w-full h-full object-cover"
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}

export { Gallery, type Props as GalleryProps };
