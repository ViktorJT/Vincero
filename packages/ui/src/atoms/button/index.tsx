import { Button as ShadcnButton } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";

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
    "ui-transition-colors ui-duration-200",
    {
      "ui-bg-white ui-text-primary hover:ui-bg-primary hover:ui-text-primary-foreground":
        variant === "primary",
      "ui-bg-transparent ui-text-primary-foreground ui-border ui-border-primary-foreground hover:ui-bg-primary-foreground hover:ui-text-primary":
        variant === "secondary",
      "ui-bg-transparent ui-text-primary-foreground ui-border ui-border-primary-foreground hover:ui-bg-primary-foreground/10":
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
