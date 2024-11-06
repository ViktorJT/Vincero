"use client";

import { forwardRef, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider } from "react-hook-form";

import { cn } from "../../lib/utils/cn";
import { useFormField } from "../../lib/hooks/useFormField";

import { FormFieldContext, FormItemContext } from "../../lib/contexts/form";

import { Label } from "../../atoms/label";

import type {
  HTMLParagraphElementAttributes,
  RootComponentPropsWithoutRef,
  SlotComponentPropsWithoutRef,
  HTMLDivElementAttributes,
  FormControllerProps,
  SlotElementRef,
  RootElementRef,
  FieldValues,
  FieldPath,
} from "./index.types";

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: FormControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItem = forwardRef<HTMLDivElement, HTMLDivElementAttributes>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<RootElementRef, RootComponentPropsWithoutRef>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <Label
        ref={ref}
        className={cn(error && "text-destructive", className)}
        htmlFor={formItemId}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<SlotElementRef, SlotComponentPropsWithoutRef>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField();

    return (
      <Slot
        ref={ref}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        id={formItemId}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLParagraphElementAttributes
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      id={formDescriptionId}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLParagraphElementAttributes
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
