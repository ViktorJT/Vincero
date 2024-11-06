import type { ReactNode } from "react";

export interface PaginationProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  initialItemsToShow?: number;
  className?: string;
}
