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
            trigger: ref.current,
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
      className="w-full bg-accent text-primary py-12 md:py-24 lg:min-h-[50vh] flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          <h1 className="animate-item md:w-1/3 text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>

          {textBlocks && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:w-2/3">
              {textBlocks.map((block, i) => (
                <div key={i}>
                  <RichText
                    content={block}
                    renderers={{
                      h1: ({ children }) => (
                        <p className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                          {children}
                        </p>
                      ),
                      p: ({ children }) => (
                        <p className="animate-item text-sm md:text-base lg:text-lg text-muted-foreground">
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
      </div>
    </section>
  );
}
