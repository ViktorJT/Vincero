"use client";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import type { Props } from "./index.types.ts";

gsap.registerPlugin(ScrollTrigger);

export function Banner({ title, textBlocks = [] }: Props) {
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
      className="w-full bg-accent text-dark text-balance py-20 px-10 min-h-[50dvh] flex flex-col md:gap-0 gap-8 md:flex-row justify-items-center md:items-center"
    >
      <div className="md:w-1/2">
        <h1 className="animate-item text-heading-large md:text-display-large md:pr-10">
          {title}
        </h1>
      </div>

      {textBlocks && (
        <div className="md:grid grid-cols-1 md:grid-cols-3 gap-8 md:w-1/2 contents">
          {textBlocks.map((block, i) => (
            <div key={i}>
              <RichText
                content={block}
                renderers={{
                  h1: ({ children }) => (
                    <p className="animate-item text-heading-large md:text-display-large mb-2">
                      {children}
                    </p>
                  ),
                  p: ({ children }) => (
                    <p className="animate-item text-detail md:text-body-large">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
