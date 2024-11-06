export interface UsePaginationProps<T> {
  items: T[];
  initialItemsToShow?: number;
}

export interface UsePaginationResult<T> {
  visibleItems: T[];
  showMore: () => void;
  showLess: () => void;
  canShowMore: boolean;
  canShowLess: boolean;
}
