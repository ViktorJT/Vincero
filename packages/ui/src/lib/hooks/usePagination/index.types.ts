export interface UsePaginationProps<T> {
  items: T[];
  itemsToShow?: number;
}

export interface UsePaginationResult<T> {
  visibleItems: T[];
  showMore: () => void;
  showLess: () => void;
  canShowMore: boolean;
  canShowLess: boolean;
  reset: (newItemsToShow: number) => void;
}
