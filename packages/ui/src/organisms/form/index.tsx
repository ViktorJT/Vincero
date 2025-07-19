"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

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

import type { Props } from "./index.types";

function Form({
  id,
  name,
  image,
  fields = [],
  submitButtonLabel,
  action = "/api/contact",
  contact,
}: Props) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: "",
      }),
      {} as Record<string, string>,
    ),
  });

  const onSubmit = async (data: Record<string, string>) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      const formattedMessage = fields
        .map((field) => `${field.label}: ${data[field.id]}`)
        .join("\n");

      const response = await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          message: formattedMessage,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSuccessMessage("Form submitted successfully.");
      form.reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit form. Please try again.");
    }
  };

  return (
    <section id={id}>
      <div className="flex flex-col justify-between md:flex-row basis-1/2 md:gap-10 mx-auto w-full px-6 md:px-20 py-10 md:py-14">
        {/* Media Section */}
        {image && (
          <div className="grow">
            <div className="mb-8 h-[320px] col-span-full">
              <Media asset={image} className="h-full" />
            </div>
            <div className="flex flex-wrap gap-6 mb-10">
              {Object.values(contact).map(({ title, text }) => (
                <div key={title} className="basis-1/3 md:basis-1/4 shrink-0">
                  <p className="text-detail text-light">{title}</p>
                  <p className="break-keep">{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Section */}
        <ShadCNForm {...form}>
          <form
            className="basis-1/2 flex flex-col gap-6 w-full"
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
                      <p className="inline text-dark">{field.label}</p>
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      {field.type === "textArea" ? (
                        <textarea
                          className="flex w-full rounded-md border border-black bg-transparent px-3 py-2 text-body shadow-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
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

            {(successMessage || errorMessage) && (
              <p
                className={`col-span-full md:col-start-2 mt-4 text-sm ${
                  successMessage ? "text-green-600" : "text-destructive"
                }`}
              >
                {successMessage || errorMessage}
              </p>
            )}
          </form>
        </ShadCNForm>
      </div>
    </section>
  );
}

export { Form, type Props as FormProps };
