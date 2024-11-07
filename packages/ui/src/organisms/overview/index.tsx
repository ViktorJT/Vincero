"use client";

import { Pagination } from "../../atoms/pagination";

import type { PageProps, Props } from "./index.types";
import { PageCard } from "../../atoms/pageCard";

export function Overview({ title, subtitle, pages = [] }: Props) {
  const render = (page: PageProps) => <PageCard {...page} />;

  return (
    <section className="dark:bg-dark bg-light w-full py-12 md:py-24">
      <div className="container px-4 mx-auto">
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
          items={pages}
          renderItem={render}
        />
      </div>
    </section>
  );
}
