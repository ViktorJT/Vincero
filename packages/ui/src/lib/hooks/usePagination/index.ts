import { useState, useMemo, useCallback } from "react";

import type { UsePaginationProps, UsePaginationResult } from "./index.types";

export function usePagination<T>({
  items,
  itemsToShow = 3,
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [visible, setVisible] = useState(itemsToShow);

  const visibleItems = useMemo(() => items.slice(0, visible), [items, visible]);

  const showMore = useCallback(() => {
    setVisible(items.length);
  }, [items.length, itemsToShow]);

  const showLess = useCallback(() => {
    setVisible(itemsToShow);
  }, [itemsToShow]);

  const reset = useCallback((newItemsToShow: number) => {
    setVisible(newItemsToShow);
  }, []);

  const canShowMore = visible < items.length;
  const canShowLess = visible > itemsToShow;

  return {
    visibleItems,
    showMore,
    showLess,
    canShowMore,
    canShowLess,
    reset,
  };
}
