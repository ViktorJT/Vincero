"use client";

import { Button } from "../button";

import { usePagination } from "../../lib/hooks/usePagination";
import { cn } from "../../lib/utils/cn";

import type { PaginationProps } from "./index.types";

export function Pagination<T>({
  items,
  renderItem,
  initialItemsToShow = 3,
  className = "",
}: PaginationProps<T>) {
  const { visibleItems, showMore, showLess, canShowMore, canShowLess } =
    usePagination({
      items,
      initialItemsToShow,
    });

  return (
    <div className={cn("grid grid-rows-[auto, auto] gap-8", className)}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map(renderItem)}
      </div>
      <div className="border-t dark:text-light text-dark text-detail border-t-primary border-t-1 flex justify-center">
        {canShowMore ? (
          <Button
            arrow={false}
            className="mt-4"
            variant="outline"
            onClick={showMore}
          >
            Visa mer (<span>{items.length}</span>)
          </Button>
        ) : (
          canShowLess && (
            <Button
              arrow={false}
              className="mt-4"
              variant="outline"
              onClick={showLess}
            >
              Visa mindre
            </Button>
          )
        )}
      </div>
    </div>
  );
}
