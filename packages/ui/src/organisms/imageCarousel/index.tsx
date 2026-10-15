"use client";

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
};

export function ImageCarousel({
  title,
  subtitle,
  id,
  images,
}: ImageCarouselProps) {
  // Looping, so both arrows always work when there's more than one image
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });
  const hasArrows = images.length > 1;

  return (
    <section className="relative text-dark w-full py-10 md:py-14" id={id}>
      <Title
        className="px-6 md:px-20 mx-auto"
        subtitle={subtitle}
        title={title}
      />

      <div
        ref={emblaRef}
        className="relative w-full h-[40vh] md:h-[80vh] min-h-[560px] overflow-hidden px-6 md:px-20"
      >
        <div className="-mx-4 flex h-full">
          {images.map((image, index) => (
            <div
              key={`${index}-${image.id}`}
              className="pl-4 flex-[0_0_92%] h-full flex items-center justify-center"
            >
              <Media
                asset={image}
                className="h-full w-full object-cover rounded-md object-center"
              />
            </div>
          ))}
        </div>

        {hasArrows && (
          <Button
            arrow={false}
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 bg-white backdrop-blur-sm rounded-full p-2"
            size="icon"
            variant="ghost"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        {hasArrows && (
          <Button
            arrow={false}
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 bg-white backdrop-blur-sm rounded-full p-2"
            size="icon"
            variant="ghost"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  );
}
