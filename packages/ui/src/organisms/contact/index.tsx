"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../molecules/form";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { Media } from "../../molecules/media";
import { Paragraph } from "../../molecules/text";

import { useToast } from "../../lib/hooks/useToast";
import { createFormSchema } from "../../lib/utils/createFormSchema";

import type { z } from "zod";

import type { Props } from "./index.types";

export function Contact({
  name,
  image,
  text,
  fields = [],
  submitButtonLabel,
  action,
}: Props) {
  const { toast } = useToast();
  const formSchema = createFormSchema(fields);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: "",
      }),
      {},
    ),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Success",
        description: "Form submitted successfully",
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-dark grid grid-cols-[160px_1fr] gap-4 max-w-5xl mx-auto w-full max-w-4xl px-4">
      {/* Media Section */}
      {image && (
        <div className="mb-8 h-[320px] md:col-span-full">
          <Media className="h-full" media={image} />
        </div>
      )}

      {/* Text Section */}
      {text && <Paragraph content={[text]} />}

      {/* Form Section */}
      <Form {...form}>
        <form
          className="contents"
          id={name}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map((field) => (
            <FormField
              key={field.id}
              control={form.control}
              name={field.id}
              render={({ field: formField }) => (
                <FormItem className="col-start-2 col-span-1">
                  <FormLabel>
                    <p className="inline dark:text-light text-dark">
                      {field.label}
                    </p>
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    {field.type === "textArea" ? (
                      <textarea
                        className="flex w-full rounded-md border border-muted bg-transparent px-3 py-2 text-body shadow-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    ) : (
                      <Input
                        placeholder={field.placeholder}
                        type={field.type}
                        {...formField}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            arrow={false}
            className="col-start-2"
            type="submit"
            variant="default"
          >
            {submitButtonLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}
