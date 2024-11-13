"use client";

import { useState, useCallback, useEffect, forwardRef, useRef } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import useEmblaCarousel from "embla-carousel-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import type { CarouselApi, CarouselProps, ContainerProps } from "./index.types";
import type { KeyboardEvent, HTMLAttributes } from "react";

import {
  useCarousel,
  CarouselContext,
} from "../../lib/hooks/useCarousel/useCarousel";

import { cn } from "../../lib/utils/cn";
import { useSplitText } from "../../lib/utils/split-text";

import { ProfileCard } from "../../atoms/profileCard";
import { PageCard } from "../../atoms/pageCard";

const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & ContainerProps
>(
  (
    { orientation = "horizontal", opts, setApi, className, children, ...props },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        dragFree: true,
        axis: orientation === "horizontal" ? "x" : "y",
        ...opts,
      },
      [
        WheelGesturesPlugin({
          forceWheelAxis: "x",
        }),
      ],
    );

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          aria-roledescription="carousel"
          className={cn("relative", className)}
          role="region"
          onKeyDownCapture={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Container.displayName = "Container";

const Content = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Content.displayName = "Content";

const Item = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        role="group"
        {...props}
      />
    );
  },
);
Item.displayName = "Item";

function Carousel({
  title,
  subtitle,
  profiles,
  pages,
  variant,
  id,
}: CarouselProps) {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const titleLines = useSplitText(titleRef, {
    tag: "div",
    linesClass: "split-line-",
  });

  const subtitleLines = useSplitText(subtitleRef, {
    tag: "div",
    linesClass: "split-line-",
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=25%",
          toggleActions: "play none none reverse",
        },
      });

      // Hide all elements initially
      gsap.set(["[class*='split-line-']"], {
        opacity: 0,
        y: 40,
      });

      // Animate split text lines
      tl.to("[class*='split-line-']", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { dependencies: [titleLines, subtitleLines], scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-dark text-dark dark:text-light w-full"
      id={id}
    >
      <div className="max-w-[540px] mx-auto md:max-w-none text-pretty grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 px-6 md:px-10 pt-20 mb-10 md:mb-20">
        <h2 ref={titleRef} className="text-heading-large md:text-display mr-10">
          {title}
        </h2>

        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-body md:text-body-large max-w-[75%]"
          >
            {subtitle}
          </p>
        )}
      </div>

      <Container
        className="z-10 w-full flex flex-col"
        opts={{ align: "center", loop: true }}
      >
        <Content>
          {variant === "team"
            ? profiles?.map((profile) => (
                <Item key={profile.id} className="basis-1/2 md:basis-1/4">
                  <ProfileCard {...profile} />
                </Item>
              ))
            : pages?.map((page) => (
                <Item key={page.id} className="basis-1/2 md:basis-1/4">
                  <PageCard {...page} />
                </Item>
              ))}
        </Content>
      </Container>

      <div className="absolute h-1/6 bg-dark bottom-0 left-0 right-0" />
    </section>
  );
}

export { Carousel, type CarouselProps };
