"use client";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import { useState, type FC } from "react";
import type { ListItem, ListProps } from "./index.types";
import { Button } from "../../atoms/button";

const ITEMS_PER_PAGE = 10;

const ListItemCard: FC<ListItem> = ({ title, date, body, link }) => {
  const { href } = prioritiseHref(link);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <div className="flex flex-col gap-3 text-dark dark:text-light">
      <h2 className="text-heading-small line-clamp-1">{title}</h2>
      {date && <h3 className="text-detail line-clamp-1">{formattedDate}</h3>}
      <p className="text-body line-clamp-3">{body}</p>
      <Button href={href} size="sm" variant="outline">
        {link.displayText}
      </Button>
    </div>
  );
};

const List: FC<ListProps> = ({ items, moreLabel, lessLabel }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="flex flex-col gap-20 items-center px-6 md:px-20 py-14 bg-white dark:bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
        {visibleItems.map(
          (item) => item && <ListItemCard key={item.id} {...item} />,
        )}
      </div>
      {hasMore && (
        <Button arrow={false} variant="outline" onClick={handleLoadMore}>
          {moreLabel}
        </Button>
      )}
      {visibleCount >= items.length && (
        <Button
          arrow={false}
          variant="outline"
          onClick={() => setVisibleCount(ITEMS_PER_PAGE)}
        >
          {lessLabel}
        </Button>
      )}
    </div>
  );
};

export { List, type ListProps };
