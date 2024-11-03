import React from "react";
import { Button as ShadcnButton } from "../../../lib/shadcn/button";
import { cn } from "../../../lib/utils";

import type { FC } from "react";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnButton> {
  variant?: "primary" | "secondary" | "tertiary";
  href?: string;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  className,
  href,
  ...props
}) => {
  const buttonClasses = cn(
    "transition-colors duration-200",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90":
        variant === "primary",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80":
        variant === "secondary",
      "bg-accent text-accent-foreground hover:bg-accent/90":
        variant === "tertiary",
    },
    className,
  );

  if (href) {
    return (
      <ShadcnButton asChild className={buttonClasses} {...props}>
        <a href={href}>{props.children}</a>
      </ShadcnButton>
    );
  }

  return <ShadcnButton className={buttonClasses} {...props} />;
};

export { Button };
