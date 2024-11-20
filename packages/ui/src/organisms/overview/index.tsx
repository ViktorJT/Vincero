"use client";

import { Pagination } from "../../atoms/pagination";
import { Card } from "../../molecules//card";

import type { CardProps, Props } from "./index.types";

function Overview({ id, title, subtitle, items = [] }: Props) {
  const render = (item: CardProps, i: number) => {
    return (
      <Card key={`${item.id}-${i}`} aspectRatio="aspect-[4/3]" {...item} />
    );
  };

  return (
    <section className="dark:bg-dark bg-white w-full py-12 md:py-24" id={id}>
      <div className="px-6 md:px-10 mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="dark:text-light text-dark grid gap-6 md:grid-cols-2 mb-12">
            {title && (
              <p className="text-heading-large grow font-bold tracking-tight mb-2 md:text-4xl">
                {title}
              </p>
            )}
            {subtitle && <p className="grow max-w-80 text-lg">{subtitle}</p>}
          </div>
        )}
        {/* Grid Layout */}
        <Pagination
          className="mb-6"
          initialItemsToShow={4}
          items={items}
          renderItem={render}
        />
      </div>
    </section>
  );
}

export { Overview, type Props as OverviewProps };
