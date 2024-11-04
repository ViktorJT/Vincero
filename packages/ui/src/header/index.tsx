"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useSplitText } from "../../lib/split-text";

import { Button } from "../atoms/button";
import { Media } from "../media";

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

  console.log({ links });

  return (
    <section
      ref={ref}
      className="relative grid grid-rows-1 grid-cols-1 place-items-start w-full overflow-hidden"
    >
      {background && (
        <Media
          className="media col-start-1 col-end-[-1] row-start-1 row-end-[-1] h-dvh w-full"
          media={background}
          variant="default"
        />
      )}
      <div className="header col-start-1 col-end-[-1] row-start-1 row-end-[-1] h-1/2 w-full bg-primary flex flex-col justify-end text-primary-foreground overflow-hidden">
        <div className="flex flex-col md:flex-row gap-5 justify-between w-full p-10">
          <h1 className="title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <div>
            <p className="subtitle text-xl md:text-2xl mb-8">{subtitle}</p>
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
                    //target={link.target === "self" ? undefined : "_blank"}
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
