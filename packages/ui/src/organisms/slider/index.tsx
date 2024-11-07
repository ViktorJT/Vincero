"use client";

import { useRef } from "react";

import { Button } from "../../atoms/button";
import { Asset } from "../../molecules//media/variants/asset";

import { cn } from "../../lib/utils/cn";

import type {
  Column,
  MediaBlockProps,
  Props,
  TextBlockProps,
} from "./index.types.ts";

export function Slider({ blocks = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  let blocksLength = blocks.length * 2;

  const columns = blocks.reduce<[Column, Column]>(
    (acc, curr, i) => {
      const { title, heading, body, links, media } = curr;

      const text = {
        title,
        heading,
        body,
        links,
      };

      if (i % 2) {
        acc[0].push({ media, order: -blocksLength + i });
        acc[1].push({ ...text, order: -blocksLength + i + 1 });
      } else {
        acc[0].push({ ...text, order: -blocksLength + i + 1 });
        acc[1].push({ media, order: -blocksLength + i });
      }

      blocksLength = blocksLength - 2;

      return acc;
    },
    [[], []],
  );

  const isMediaBlock = (
    item: MediaBlockProps | TextBlockProps,
  ): item is MediaBlockProps => {
    return "media" in item;
  };

  return (
    <div
      ref={ref}
      className="flex flex-col bg-white dark:bg-dark text-dark dark:text-light md:flex-row min-h-dvh relative w-full"
    >
      {columns.map((block, colIndex) => (
        <div
          key={`slider-col-${colIndex}`}
          className="contents md:flex flex-col grow"
        >
          {block.map((item, blockIndex) => {
            const isMedia = isMediaBlock(item);

            return (
              <div
                key={`${colIndex}-${blockIndex}`}
                className={cn("contents md:block", {
                  "h-auto md:h-[200dvh]": isMedia,
                })}
              >
                <div
                  className={cn("overflow-hidden h-auto md:h-dvh w-full", {
                    "block md:sticky top-0": isMedia,
                    "flex items-center justify-center": !isMedia,
                  })}
                  style={{ order: item.order }}
                >
                  {isMedia ? (
                    <Asset
                      ref={(el: HTMLVideoElement) => videoRefs.current.push(el)}
                      className="relative h-[50vh] md:h-screen"
                      media={[item.media]}
                    />
                  ) : (
                    <div className="flex bg-white dark:bg-dark -mt-10 md:mt-0 mx-6 z-10 z-0 flex-col items-center gap-6 md:gap-10 text-center p-6 pb-20 max-w-[540px]">
                      {item.title && (
                        <p className="text-accent dark:text-muted text-detail uppercase">
                          {item.title}
                        </p>
                      )}

                      <p className="text-body-large sm:text-heading-large lg:text-display">
                        {item.heading}
                      </p>

                      <p className="text-body">{item.body}</p>

                      {item.links && (
                        <div className="flex gap-4 pt-4">
                          {item.links.map((link, i) => (
                            <Button
                              key={link.id}
                              {...link}
                              variant={i === 0 ? "default" : "ghost"} // @todos from CMS
                            >
                              {link.displayText}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
