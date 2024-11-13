"use client";

import { useRef } from "react";

import { Button } from "../../atoms/button";
import { Asset } from "../../molecules//media/variants/asset";

import { cn } from "../../lib/utils/cn";

import type {
  MediaBlockProps,
  TextBlockProps,
  Column,
  Props,
} from "./index.types.ts";

function Slider({ id, blocks = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);

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
      id={id}
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
                  className={cn("md:overflow-hidden h-auto md:h-dvh w-full", {
                    "block md:sticky top-0": isMedia,
                    "flex items-center justify-center": !isMedia,
                  })}
                  style={{ order: item.order }}
                >
                  {isMedia ? (
                    <Asset
                      className="relative h-[50vh] md:h-screen"
                      media={[
                        {
                          ...item.media,
                          fluid: true,
                          className:
                            "absolute inset-0 w-full h-full object-cover",
                        },
                      ]}
                    />
                  ) : (
                    <div className="flex text-pretty bg-white dark:bg-dark -mt-10 md:mt-0 mx-6 z-10 z-0 flex-col items-center gap-6 md:gap-10 text-center p-6 pb-20 max-w-[540px]">
                      {item.title && (
                        <p className="text-accent dark:text-muted text-detail uppercase">
                          {item.title}
                        </p>
                      )}

                      <p className="text-heading sm:text-heading-large lg:text-display">
                        {item.heading}
                      </p>

                      <p className="text-body md:text-body-large">
                        {item.body}
                      </p>

                      {item.links && (
                        <div className="flex flex-wrap gap-4 pt-4 items-center justify-center">
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

export { Slider, type Props as SliderProps };
