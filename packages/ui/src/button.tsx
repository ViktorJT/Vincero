import { type ButtonHTMLAttributes } from "react";
import { cn } from "./utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles with ui- prefix
        "ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-font-medium ui-transition-colors",
        // Variant styles
        variant === "primary" &&
          "ui-bg-primary ui-text-white hover:ui-bg-primary-dark",
        variant === "secondary" &&
          "ui-bg-secondary ui-text-primary hover:ui-bg-secondary-light",
        // Size styles
        size === "sm" && "ui-px-3 ui-py-1.5 ui-text-sm",
        size === "md" && "ui-px-4 ui-py-2 ui-text-base",
        size === "lg" && "ui-px-6 ui-py-3 ui-text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
