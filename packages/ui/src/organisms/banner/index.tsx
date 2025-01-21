"use client";

import { RichText } from "@graphcms/rich-text-react-renderer";

import type { Props } from "./index.types.ts";

function Banner({ id, title, textBlocks = [] }: Props) {
  return (
    <section
      className="w-full bg-accent text-dark text-balance py-20 px-6 md:px-10 min-h-[50vh] flex items-center justify-center"
      id={id}
    >
      <div className="w-full md:max-w-none max-w-[540px] mx-auto flex flex-col md:gap-0 gap-14 md:flex-row justify-items-center justify-around md:items-center">
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
                      <p className="animate-item text-body lg:text-body-large">
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
