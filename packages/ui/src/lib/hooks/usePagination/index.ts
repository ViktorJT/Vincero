import { useState, useMemo } from "react";

import type { UsePaginationProps, UsePaginationResult } from "./index.types";

export function usePagination<T>({
  items,
  initialItemsToShow = 3,
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  const visibleItems = useMemo(
    () => items.slice(0, itemsToShow),
    [items, itemsToShow],
  );

  const showMore = () =>
    setItemsToShow((prev) => Math.min(prev + initialItemsToShow, items.length));
  const showLess = () => setItemsToShow(initialItemsToShow);

  const canShowMore = itemsToShow < items.length;
  const canShowLess = itemsToShow > initialItemsToShow;

  return { visibleItems, showMore, showLess, canShowMore, canShowLess };
}
