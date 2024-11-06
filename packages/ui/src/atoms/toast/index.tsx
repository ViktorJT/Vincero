"use client";

import {
  Provider as ToastProvider,
  Viewport as ToastPrimitivesViewport,
  Root as ToastPrimitivesRoot,
  Action as ToastPrimitivesAction,
  Close as ToastPrimitivesClose,
  Title as ToastPrimitivesTitle,
  Description as ToastPrimitivesDescription,
} from "@radix-ui/react-toast";
import { forwardRef } from "react";

import { X } from "lucide-react";

import { cn } from "../../lib/utils/cn";

import variants from "./index.styles";

import type {
  ToastViewportProps,
  ToastProps,
  ToastActionProps,
  ToastCloseProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastViewportRef,
  ToastRef,
  ToastActionRef,
  ToastCloseRef,
  ToastTitleRef,
  ToastDescriptionRef,
} from "./index.types";

const ToastViewport = forwardRef<ToastViewportRef, ToastViewportProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitivesViewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    />
  ),
);
ToastViewport.displayName = ToastPrimitivesViewport.displayName;

const Toast = forwardRef<ToastRef, ToastProps>(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitivesRoot
      ref={ref}
      className={cn(variants({ variant }), className)}
      {...props}
    />
  ),
);
Toast.displayName = ToastPrimitivesRoot.displayName;

const ToastAction = forwardRef<ToastActionRef, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitivesAction
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
      {...props}
    />
  ),
);
ToastAction.displayName = ToastPrimitivesAction.displayName;

const ToastClose = forwardRef<ToastCloseRef, ToastCloseProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitivesClose
      ref={ref}
      className={cn(
        "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        className,
      )}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitivesClose>
  ),
);
ToastClose.displayName = ToastPrimitivesClose.displayName;

const ToastTitle = forwardRef<ToastTitleRef, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitivesTitle
      ref={ref}
      className={cn("text-sm font-semibold [&+div]:text-xs", className)}
      {...props}
    />
  ),
);
ToastTitle.displayName = ToastPrimitivesTitle.displayName;

const ToastDescription = forwardRef<ToastDescriptionRef, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitivesDescription
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  ),
);
ToastDescription.displayName = ToastPrimitivesDescription.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
