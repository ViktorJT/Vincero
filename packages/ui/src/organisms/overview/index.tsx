"use client";

import { Pagination } from "../../atoms/pagination";
import { Card } from "../../molecules//card";

import type { CardProps, Props } from "./index.types";

function Overview({ id, title, subtitle, items = [] }: Props) {
  const render = (item: CardProps, i: number) => {
    return <Card key={`${item.id}-${i}`} {...item} />;
  };

  return (
    <section className="dark:bg-dark bg-white w-full py-12 md:py-24" id={id}>
      <div className="px-6 md:px-10 mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-[540px] mx-auto md:max-w-none text-dark dark:text-light text-pretty grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 pt-20 mb-10 md:mb-20">
            {title && (
              <h2 className="text-heading-large md:text-display mr-10">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-body md:text-body-large max-w-[75%]">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {/* Grid Layout */}
        <Pagination className="mb-6" items={items} renderItem={render} />
      </div>
    </section>
  );
}

export { Overview, type Props as OverviewProps };
