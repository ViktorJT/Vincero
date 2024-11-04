import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button as ShadcnButton } from "../../../lib/shadcn/button";
import { cn } from "../../../lib/utils";

import type { Props } from "./index.types.ts";

// @todo add Next Link for internal pages
//
export function Button({
  variant = "primary",
  className,
  href,
  ...props
}: Props) {
  const buttonClasses = cn(
    "transition-colors duration-200",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90":
        variant === "primary",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80":
        variant === "secondary",
    },
    className,
  );

  if (href) {
    return (
      <ShadcnButton asChild className={buttonClasses} {...props}>
        <Link href={href}>
          {props.children}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </ShadcnButton>
    );
  }

  return <ShadcnButton className={buttonClasses} {...props} />;
}
