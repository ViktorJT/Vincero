import { Slot } from "@radix-ui/react-slot";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";
import Link from "next/link";

import type { ButtonProps } from "./index.types";

import variants from "./index.styles";

import { cn } from "../../lib/utils/cn";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, href, size, asChild = false, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = (
      <Comp
        ref={ref}
        className={cn(variants({ variant, size, className }))}
        {...props}
      >
        {children}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Comp>
    );

    if (href) {
      const isExternal = href.startsWith("http");

      return isExternal ? (
        <a href={href} rel="noopener noreferrer" target="_blank">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      );
    }

    return content;
  },
);

Button.displayName = "Button";

export { Button };
