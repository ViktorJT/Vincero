"use client";

import { Card } from "../../molecules//card";
import { Title } from "../../molecules/title";

import type { CardProps, Props } from "./index.types";

function Overview({ id, title, subtitle, items = [] }: Props) {
  return (
    <section className="w-full py-10 md:py-14" id={id}>
      <div className="px-6 md:px-20 mx-auto">
        <Title subtitle={subtitle} title={title} />

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
