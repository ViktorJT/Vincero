"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { Button } from "../atoms/button";
import { Asset } from "../media/variants/asset";

import type { Props } from "./index.types.ts";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function Slider({ blocks = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useGSAP(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        ScrollTrigger.create({
          trigger: video,
          start: "top center",
          end: "bottom center",
          onEnter: () => video.play(),
          onLeave: () => video.pause(),
          onEnterBack: () => video.play(),
          onLeaveBack: () => video.pause(),
        });
      }
    });
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {blocks.map((block, index) => (
        <section
          key={block.id}
          className="grid grid-cols-1 md:grid-cols-2 min-h-screen"
        >
          <div className="order-2 md:order-1 flex flex-col justify-center p-6 md:p-12 lg:p-24">
            {block.title && (
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                {block.title}
              </p>
            )}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              {block.heading}
            </h2>

            <p className="text-muted-foreground">{block.body}</p>

            {block.links && (
              <div className="flex flex-wrap gap-4 pt-4">
                {block.links.map((link) => (
                  <Button key={link.id} {...link}>
                    {link.displayText}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Asset
            ref={(el: HTMLVideoElement) => (videoRefs.current[index] = el)}
            className="order-1 md:order-2 relative h-[50vh] md:h-screen"
            media={[block.media]}
          />
        </section>
      ))}
    </div>
  );
}
