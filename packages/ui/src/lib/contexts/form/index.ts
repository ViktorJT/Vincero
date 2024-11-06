import { createContext } from "react";
import type {
  FormFieldContextValue,
  FormItemContextValue,
} from "./index.types";

// Create and export contexts
export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);
