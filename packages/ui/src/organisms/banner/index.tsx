"use client";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import type { Props } from "./index.types.ts";

gsap.registerPlugin(ScrollTrigger);

// @todos clamp this component to maxwidth container

function Banner({ title, textBlocks = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".animate-item",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="w-full bg-accent text-dark text-balance py-20 px-6 md:px-10 min-h-[50dvh]"
    >
      <div className="md:max-w-none max-w-[540px] mx-auto flex flex-col md:gap-0 gap-14 md:flex-row justify-items-center justify-around md:items-center content-center">
        <div className="w-full w-4/5 md:w-1/2">
          <h1 className="animate-item text-heading-large md:text-display-large md:pr-10">
            {title}
          </h1>
        </div>

        {textBlocks && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:w-1/2">
            {textBlocks.map((block, i) => (
              <div key={i} className="w-full">
                <RichText
                  content={block.raw}
                  renderers={{
                    h1: ({ children }) => (
                      <p className="animate-item text-heading-large md:text-display mb-2">
                        {children}
                      </p>
                    ),
                    p: ({ children }) => (
                      <p className="animate-item text-body md:text-body-large">
                        {children}
                      </p>
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { Banner, type Props as BannerProps };
