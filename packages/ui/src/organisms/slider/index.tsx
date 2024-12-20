"use client";

import { Button } from "../../atoms/button";
import { Media } from "../media";
import { cn } from "../../lib/utils/cn";
import type { Props, TextBlockProps } from "./index.types.ts";

function Block({ title, heading, body, links }: TextBlockProps) {
  return (
    <div className="textBlock flex text-pretty bg-white dark:bg-dark -mt-10 md:mt-0 mx-6 z-10 flex-col gap-6 md:gap-10 p-6 pb-20">
      {title && (
        <p className="text-accent dark:text-muted text-detail uppercase">
          {title}
        </p>
      )}

      <p className="text-heading sm:text-heading-large lg:text-display">
        {heading}
      </p>

      <p className="text-body lg:text-body-large">{body}</p>

      {links && (
        <div className=" flex flex-wrap gap-4 pt-4">
          {links.map((link, i: number) => (
            <Button
              key={link.id}
              {...link}
              variant={i === 0 ? "outline" : "ghost"}
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
  return (
    <div
      className="flex flex-col bg-white dark:bg-dark text-dark dark:text-light w-full"
      id={id}
    >
      {blocks.map((block, index) => (
        <div
          key={`row-${index}`}
          className="contents md:flex md:flex-row min-h-[100vh]"
        >
          {/* Media Block */}
          <div
            className={cn(
              "contents md:block md:w-1/2",
              "order-1", // Always first on mobile
              index % 2 === 0 ? "md:order-2" : "md:order-1", // Alternating on desktop
            )}
          >
            <Media
              fluid
              asset={{
                ...block.asset,
                className:
                  "absolute inset-0 w-full h-full object-cover object-center",
              }}
              className="relative h-[50vh] md:h-full"
            />
          </div>

          {/* Text Block */}
          <div
            className={cn(
              "contents md:flex md:items-center md:justify-center md:w-1/2",
              "order-2", // Always second on mobile
              index % 2 === 0 ? "md:order-1" : "md:order-2", // Alternating on desktop
            )}
          >
            <Block
              body={block.body}
              heading={block.heading}
              links={block.links}
              title={block.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export { Slider, type Props as SliderProps };
