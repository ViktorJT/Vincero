"use client";

import { Button } from "../../atoms/button";
import { Media } from "../media";

import { cn } from "../../lib/utils/cn";

import type {
  MediaBlockProps,
  TextBlockProps,
  Column,
  Props,
} from "./index.types.ts";

function Block({ title, heading, body, links }: TextBlockProps) {
  return (
    <div className="textBlock flex text-pretty bg-white dark:bg-dark -mt-10 md:mt-0 mx-6 z-10 z-0 flex-col gap-6 md:gap-10 p-6 pb-20 max-w-[540px]">
      {title && (
        <p className="animate-item text-accent dark:text-muted text-detail uppercase">
          {title}
        </p>
      )}

      <p className="text-heading sm:text-heading-large lg:text-display">
        {heading}
      </p>

      <p className="text-body md:text-body-large">{body}</p>

      {links && (
        <div className="animate-item flex flex-wrap gap-4 pt-4">
          {links.map((link, i: number) => (
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
  );
}

function Slider({ id, blocks = [] }: Props) {
  let blocksLength = blocks.length * 2;

  const columns = blocks.reduce<[Column, Column]>(
    (acc, curr, i) => {
      const { title, heading, body, links, asset } = curr;

      const text = {
        title,
        heading,
        body,
        links,
      };

      if (i % 2) {
        acc[0].push({ asset, order: -blocksLength + i });
        acc[1].push({ ...text, order: -blocksLength + i + 1 });
      } else {
        acc[0].push({ ...text, order: -blocksLength + i + 1 });
        acc[1].push({ asset, order: -blocksLength + i });
      }

      blocksLength = blocksLength - 2;

      return acc;
    },
    [[], []],
  );

  const isMediaBlock = (
    item: MediaBlockProps | TextBlockProps,
  ): item is MediaBlockProps => {
    return "asset" in item;
  };

  return (
    <div
      className="flex flex-col bg-white dark:bg-dark text-dark dark:text-light md:flex-row min-h-dvh relative w-full"
      id={id}
    >
      {columns.map((block, colIndex) => (
        <div
          key={`slider-col-${colIndex}`}
          className="contents md:flex flex-col md:basis-1/2"
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
                    <Media
                      fluid
                      asset={{
                        ...item.asset,
                        className:
                          "absolute inset-0 w-full h-full object-cover object-center",
                      }}
                      className="relative h-[50vh] md:h-screen"
                    />
                  ) : (
                    <Block {...item} />
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
