import { ArrowRight } from "lucide-react";
import { Link } from "@vincero/languages-config/navigation";

import type { ButtonProps } from "./index.types";

import variants from "./index.styles";

import { cn } from "../../lib/utils/cn";

// With `href` this renders a link styled as a button (never a <button> inside
// an <a>, which is invalid HTML); without it, a regular <button>.
function Button({
  className,
  arrow = true,
  variant,
  href,
  size,
  children,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(variants({ variant, size, className }));

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" />}
    </>
  );

  if (href) {
    return href.startsWith("http") ? (
      <a
        className={classes}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    ) : (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export { Button };
