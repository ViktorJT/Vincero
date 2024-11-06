import type { VariantProps } from "class-variance-authority";
import type variants from "./index.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  asChild?: boolean;
  href?: string;
}

export type ButtonVariants = VariantProps<typeof variants>;
