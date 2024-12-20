"use client";

import { Card } from "../../molecules//card";

import type { CardProps, Props } from "./index.types";

function Overview({ id, title, subtitle, items = [] }: Props) {
  return (
    <section className="dark:bg-dark bg-white w-full py-10 md:py-14" id={id}>
      <div className="px-6 md:px-10 mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-[540px] mx-auto md:max-w-none text-dark dark:text-light text-pretty grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 mb-10 md:mb-12">
            {title && (
              <h2 className="text-heading-large md:text-display mr-10">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-body lg:text-body-large max-w-[75%]">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {/* Grid Layout */}
        <div className="grid grid-rows-[auto,auto] gap-8 mb-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item: CardProps, i: number) => (
              <Card key={`${item.id}-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Overview, type Props as OverviewProps };
