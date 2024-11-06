"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useSplitText } from "../../lib/utils/split-text";

import { Button } from "../../atoms/button";
import { Media } from "../../molecules/media";

import type { Props } from "./index.types.ts";

export function Header({ title, subtitle, links, background }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const titleLines = useSplitText(titleRef); // @todo make this work
  const subtitleLines = useSplitText(subtitleRef); // @todo make this work

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".media",
        { scale: 2 },
        { scale: 1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".header",
          { yPercent: -100 },
          { yPercent: 0, duration: 0.8, ease: "power3.out" },
          0, // Start at the same time as the `.video` animation
        )
        .fromTo(
          [".title", ".subtitle", ".buttons"],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.4",
        );
    },
    { dependencies: [titleLines, subtitleLines], scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative grid grid-rows-2 grid-cols-1 place-items-start w-full overflow-hidden"
    >
      {background && (
        <Media
          className="media col-span-full row-span-full h-dvh w-full"
          media={background}
          variant="default"
        />
      )}
      <div className="header col-span-full row-start-1 row-span-1 h-full w-full bg-dark flex flex-col justify-end text-light">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full p-10 items-end">
          <h1 className="title text-heading-large md:text-display-large max-w-[640px]">
            {title}
          </h1>
          <div className="flex flex-col gap-4">
            <p className="subtitle text-body-base md:text-body-large max-w-[320px]">
              {subtitle}
            </p>
            {links && (
              <div className="buttons flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <Button
                    key={index}
                    aria-label={link.ariaLabel}
                    href={link.url}
                    rel={
                      link.target !== "self" ? "noopener noreferrer" : undefined
                    }
                    title={link.titleAttribute}
                    variant={link.variant}
                  >
                    {link.displayText}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
