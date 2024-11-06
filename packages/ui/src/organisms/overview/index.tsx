"use client";

import Link from "next/link";

import { Card, CardContent, CardFooter } from "../../atoms/card";
import { Pagination } from "../../atoms/pagination";
import { Media } from "../../molecules/media";

import type { PageProps, Props } from "./index.types";

export function Overview({ title, subtitle, pages = [] }: Props) {
  const render = (page: PageProps) => (
    <Link href={page.href}>
      <Card
        key={page.id}
        className="h-full bg-white shadow-lg rounded-md overflow-hidden"
      >
        <CardContent className="p-0">
          <Media className="h-full aspect-[4/3]" media={page.image} />
        </CardContent>
        <CardFooter className="flex-col p-4 items-start">
          <h3 className="font-semibold mb-2">{page.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {page.description}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {title && (
              <h2 className="text-3xl grow font-bold tracking-tight mb-2 md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="grow max-w-80 text-muted-foreground text-lg">
                {subtitle}
              </p>
            )}
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
