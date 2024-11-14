"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { useSplitText } from "../../lib/utils/split-text";
import { cn } from "../../lib/utils/cn";

import { Asset } from "../../molecules/media/variants/asset";

import type { Props } from "./index.types.ts";

function Header({ title, subtitle, background }: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline();

      // Hide all lines initially
      gsap.set("[class*='split-line-']", {
        opacity: 0,
        y: 40,
        rotate: 0,
        scale: 1,
      });

      gsap.set(".header", {
        yPercent: -100,
      });

      tl.fromTo(
        ".media .video, .media .image",
        { scale: 2 },
        { scale: 1, duration: 1, ease: "power3.out" },
      )
        .to(".header", { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(
          "[class*='split-line-']",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        );
    },
    { dependencies: [titleLines, subtitleLines], scope: ref },
  );

  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-[50vh] grid grid-cols-1 place-items-start w-full overflow-hidden",
        {
          "grid-rows-4": !!background,
          "grid-rows-1": !background,
        },
      )}
    >
      {background && (
        <Asset
          className="media place-self-end col-span-full row-span-full h-dvh w-full"
          media={[
            {
              ...background,
              fluid: true,
              className: "absolute inset-0 w-full h-full object-cover",
            },
          ]}
        />
      )}

      <div
        className={cn(
          "header col-span-full h-full w-full bg-dark text-balance flex flex-col justify-end text-light",
          {
            "row-start-1 row-end-4 md:row-end-3": !!background,
            "row-span-full": !background,
          },
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6 md:px-10 py-10 items-end">
          <h1
            ref={titleRef}
            className="title text-heading-large md:text-display-large md:max-w-[640px] md:pr-10"
          >
            {title}
          </h1>
          <p
            ref={subtitleRef}
            className="subtitle text-body-base md:text-body-large md:max-w-[400px]"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export { Header, type Props as HeaderProps };
