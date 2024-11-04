import { Button } from "../button";

import { cn } from "../../../lib/utils";

import type { Props } from "./index.types";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          className="w-8 h-8 p-0"
          size="sm"
          variant={currentPage === i ? "primary" : "secondary"}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}
