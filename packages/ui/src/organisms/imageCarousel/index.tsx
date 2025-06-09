"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../atoms/button";
import { Media } from "../media";
import type { AssetProps } from "../../types";

export type ImageCarouselProps = {
  title?: string;
  subtitle?: string;
  id?: string;
  images: AssetProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
};

export function ImageCarousel({
  title,
  subtitle,
  id,
  images,
  options,
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    ...options,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((embla: typeof emblaApi) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative bg-white py-14 dark:bg-dark text-dark dark:text-light w-full"
      id={id}
    >
      {(title || subtitle) && (
        <div className="max-w-[540px] mx-auto md:max-w-none text-pretty grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 px-6 md:px-10 pt-20 mb-10 md:mb-20">
          {title && (
            <h2 className="text-heading-large md:text-display">{title}</h2>
          )}
          {subtitle && (
            <p className="text-body lg:text-body-large max-w-[75%]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div
        ref={emblaRef}
        className="relative w-full h-[80vh] min-h-[560px] overflow-hidden px-6 md:px-20"
      >
        <div className="-mx-4 flex h-full">
          {images.map((image, index) => (
            <div
              key={`${index}-${image.id}`}
              className="pl-4 flex-[0_0_80%] md:flex-[0_0_70%] h-full flex items-center justify-center"
            >
              <Media
                asset={image}
                className="h-full w-full object-cover rounded-md object-center"
              />
            </div>
          ))}
        </div>

        {canScrollPrev && (
          <Button
            arrow={false}
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 bg-white backdrop-blur-sm rounded-full p-2"
            size="icon"
            variant="ghost"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        {canScrollNext && (
          <Button
            arrow={false}
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 bg-white backdrop-blur-sm rounded-full p-2"
            size="icon"
            variant="ghost"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  );
}
