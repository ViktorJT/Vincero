"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form as ShadCNForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../molecules/form";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { Media } from "../../organisms/media";
import { Paragraph } from "../../organisms/text";

import { useToast } from "../../lib/hooks/useToast";

import type { z } from "zod";

import type { Props } from "./index.types";

function Form({
  id,
  name,
  image,
  text,
  fields = [],
  submitButtonLabel,
  action,
  schema,
}: Props) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: "",
      }),
      {},
    ),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
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
    <section className="bg-white dark:bg-dark" id={id}>
      <div className="grid grid-cols-[160px_1fr] gap-4 max-w-5xl mx-auto w-full px-6 md:px-10 py-10 md:py-20">
        {/* Media Section */}
        {image && (
          <div className="mb-8 h-[320px] col-span-full">
            <Media asset={image} className="h-full" />
          </div>
        )}

        {/* Text Section */}
        {text && <Paragraph className="col-span-full" content={[text]} />}

        {/* Form Section */}
        <ShadCNForm {...form}>
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
                  <FormItem className="col-span-full md:col-start-2 md:col-span-1">
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
              className="col-span-full md:col-start-2"
              type="submit"
              variant="default"
            >
              {submitButtonLabel}
            </Button>
          </form>
        </ShadCNForm>
      </div>
    </section>
  );
}

export { Form, type Props as FormProps };
