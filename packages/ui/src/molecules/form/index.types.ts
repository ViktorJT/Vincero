import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import type { Root } from "@radix-ui/react-label";
import type { Slot } from "@radix-ui/react-slot";
import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ElementRef,
} from "react";

export type { FieldPath, FieldValues };

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export type FormItemContextValue = {
  id: string;
};

export type HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>;

export type HTMLParagraphElementAttributes =
  HTMLAttributes<HTMLParagraphElement>;

export type RootElementRef = ElementRef<typeof Root>;

export type RootComponentPropsWithoutRef = ComponentPropsWithoutRef<
  typeof Root
>;

export type SlotElementRef = ElementRef<typeof Slot>;

export type SlotComponentPropsWithoutRef = ComponentPropsWithoutRef<
  typeof Slot
>;

export type FormControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;
