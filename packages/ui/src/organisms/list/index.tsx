"use client";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import { useState, type FC } from "react";
import type { ListItem, ListProps } from "./index.types";
import { Button } from "../../atoms/button";
import { Title } from "../../molecules/title";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

const ListItemCard: FC<ListItem> = ({ title, date, body, link }) => {
  const { href } = prioritiseHref(link);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <Link
      className="transition-all text-body flex flex-col gap-3 bg-light/10 text-dark p-4 shadow-md md:hover:bg-white md:hover:shadow-lg md:hover:-translate-y-1"
      href={href}
    >
      {date && <h3 className="text-detail text-light">{formattedDate}</h3>}
      <h2 className="text-heading-small">{title}</h2>
      <p className="line-clamp-3">{body}</p>
    </Link>
  );
};

const List: FC<ListProps> = ({
  id,
  items,
  title,
  subtitle,
  lessLabel,
  moreLabel,
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section className="w-full py-10 md:py-14" id={id}>
      <div className="px-6 md:px-20 mx-auto">
        <Title subtitle={subtitle} title={title} />

        <div className="flex flex-col gap-20 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map(
              (item) => item && <ListItemCard key={item.id} {...item} />,
            )}
          </div>
          {hasMore && (
            <Button arrow={false} variant="outline" onClick={handleLoadMore}>
              {moreLabel}
            </Button>
          )}
          {items.length > ITEMS_PER_PAGE && visibleCount > items.length && (
            <Button
              arrow={false}
              variant="outline"
              onClick={() => setVisibleCount(ITEMS_PER_PAGE)}
            >
              {lessLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export { List, type ListProps };
