"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useSplitText } from "../../lib/utils/split-text";

import { Media } from "../../molecules/media";

import type { Props } from "./index.types.ts";

function Header({ title, subtitle, background }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const titleLines = useSplitText(titleRef); // @todo make this work
  const subtitleLines = useSplitText(subtitleRef); // @todo make this work

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".media .video, .media .image",
        { scale: 2 },
        { scale: 1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".header",
          { yPercent: -100 },
          { yPercent: 0, duration: 0.8, ease: "power3.out" },
          0,
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
      className="relative grid grid-rows-4 grid-cols-1 place-items-start w-full overflow-hidden"
    >
      {background && (
        <Media
          className="media col-span-full row-span-full h-dvh w-full"
          media={background}
          variant="default"
        />
      )}

      <div className="header col-span-full row-start-1 row-end-4 md:row-end-3 h-full w-full bg-dark text-balance flex flex-col justify-end text-light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6 md:px-10 py-10 items-end">
          <h1 className="title text-heading-large md:text-display-large md:max-w-[640px] md:pr-10">
            {title}
          </h1>
          <p className="subtitle text-body-base md:text-body-large md:max-w-[400px]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export { Header, type Props as HeaderProps };
