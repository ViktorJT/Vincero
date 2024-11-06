import { Button } from "../button";

import { usePagination } from "../../lib/hooks/usePagination";
import { cn } from "../../lib/utils/cn";

import type { PaginationProps } from "./index.types";

export function Pagination<T>({
  items,
  renderItem,
  initialItemsToShow = 4,
  className = "",
}: PaginationProps<T>) {
  const { visibleItems, showMore, showLess, canShowMore, canShowLess } =
    usePagination({
      items,
      initialItemsToShow,
    });

  return (
    <div className={cn("grid grid-rows-2 gap-8", className)}>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visibleItems.map(renderItem)}
      </div>
      <div className="border-t border-t-primary border-t-1 flex justify-center">
        {canShowMore ? (
          <Button
            className="transition-all duration-300 ease-in-out mt-4"
            variant="secondary"
            onClick={showMore}
          >
            Visa mer (<span className="mx-[1px]">{items.length}</span>)
          </Button>
        ) : (
          canShowLess && (
            <Button
              className="transition-all duration-300 ease-in-out ml-4 mt-4"
              variant="secondary"
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
