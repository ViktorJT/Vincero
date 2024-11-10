/* eslint-disable @typescript-eslint/no-explicit-any */
// @todos remove any types
import { z } from "zod";

export const createFormSchema = (fields: any) => {
  const schemaFields: Record<string, z.ZodType> = {};

  fields?.forEach((field: any) => {
    let fieldSchema = z.string();

    if (field.required) {
      fieldSchema = fieldSchema.min(1, {
        message: `${field.label} is required`,
      });
    }

    if (field.type === "email") {
      fieldSchema = z.string().email({ message: "Invalid email address" });
      if (field.required) {
        fieldSchema = fieldSchema.min(1, { message: "Email is required" });
      }
    }

    schemaFields[field.id] = fieldSchema;
  });

  return z.object(schemaFields);
};
