import type { VariantProps } from "class-variance-authority";

import type variants from "./index.styles";

import type {
  Provider,
  Viewport,
  Root,
  Action,
  Close,
  Title,
  Description,
} from "@radix-ui/react-toast";

// Define the ToastProviderType
export type ToastProviderType = typeof Provider;

// Define Props and Ref types
export type ToastViewportProps = React.ComponentPropsWithoutRef<
  typeof Viewport
>;
export type ToastViewportRef = React.ElementRef<typeof Viewport>;

export type ToastProps = React.ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof variants>;

export type ToastRef = React.ElementRef<typeof Root>;

export type ToastActionProps = React.ComponentPropsWithoutRef<typeof Action>;
export type ToastActionRef = React.ElementRef<typeof Action>;

export type ToastCloseProps = React.ComponentPropsWithoutRef<typeof Close>;
export type ToastCloseRef = React.ElementRef<typeof Close>;

export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof Title>;
export type ToastTitleRef = React.ElementRef<typeof Title>;

export type ToastDescriptionProps = React.ComponentPropsWithoutRef<
  typeof Description
>;
export type ToastDescriptionRef = React.ElementRef<typeof Description>;

export type ToastActionElement = React.ReactElement<typeof Action>;
