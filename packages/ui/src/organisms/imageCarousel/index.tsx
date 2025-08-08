"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import { Title } from "../../molecules/title";
import { Button } from "../../atoms/button";
import { Media } from "../media";

import type { AssetProps, RichTextType } from "../../types";

export type ImageCarouselProps = {
  title?: RichTextType;
  subtitle?: RichTextType;
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
    <section className="relative text-dark w-full py-10 md:py-14" id={id}>
      <Title
        className="px-6 md:px-20 mx-auto"
        subtitle={subtitle}
        title={title}
      />

      <div
        ref={emblaRef}
        className="relative w-full h-[60vh] min-h-[560px] overflow-hidden px-6 md:px-20"
      >
        <div className="-mx-4 flex h-full">
          {images.map((image, index) => (
            <div
              key={`${index}-${image.id}`}
              className="pl-4 flex-[0_0_80%] md:flex-[0_0_70%] lg:flex-[0_0_60%] xl:flex-[0_0_33%] h-full flex items-center justify-center"
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
