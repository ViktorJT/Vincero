import { forwardRef } from "react";

import { cn } from "../../lib/utils/cn";

import type { InputProps } from "./index.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-black bg-transparent px-3 py-1 text-body shadow-sm transition-colors file:border-0 file:bg-transparent file:text-body file:font-medium file:text-light placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        type={type}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
