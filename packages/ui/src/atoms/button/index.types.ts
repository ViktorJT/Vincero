import type { Button } from "../../../lib/shadcn/button";
import type { ComponentPropsWithoutRef } from "react";
import type { ButtonVariant } from "../../types";

export interface Props
  extends Omit<ComponentPropsWithoutRef<typeof Button>, "variant"> {
  // @todo clean this up a bit
  variant: ButtonVariant;
  href?: string;
}
