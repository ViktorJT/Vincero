"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import { Button } from "../../atoms/button";
import { Media } from "../../organisms/media";
import { cn } from "../../lib/utils/cn";

import type { FormEvent } from "react";
import type { Props } from "./index.types";

const inputClasses =
  "flex w-full rounded-md border border-black bg-transparent px-3 text-body shadow-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const messages = {
  sv: {
    sent: "Tack! Ditt meddelande har skickats.",
    error: "Något gick fel. Försök igen.",
  },
  en: {
    sent: "Thank you! Your message has been sent.",
    error: "Something went wrong. Please try again.",
  },
};

// Plain form with browser validation (required fields); sends the fields
// as a readable message to the contact route.
function Form({
  id,
  name,
  image,
  fields = [],
  submitButtonLabel,
  action = "/api/contact",
  contact,
}: Props) {
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    const message = fields
      .map((field) => `${field.label}: ${data.get(field.id) ?? ""}`)
      .join("\n");

    setStatus("sending");

    try {
      const response = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("sent");
      formElement.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
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
        <form
          className="basis-1/2 flex flex-col gap-6 w-full"
          id={name}
          onSubmit={handleSubmit}
        >
          {fields.map((field) => {
            const inputId = `${name}-${field.id}`;
            const inputProps = {
              id: inputId,
              name: field.id,
              placeholder: field.placeholder,
              required: field.required,
              className: inputClasses,
            };

            return (
              <div key={field.id} className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-dark"
                  htmlFor={inputId}
                >
                  {field.label}
                  {field.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </label>
                {field.type === "textArea" ? (
                  <textarea
                    {...inputProps}
                    className={cn(inputClasses, "min-h-[100px] py-2")}
                  />
                ) : (
                  <input
                    {...inputProps}
                    className={cn(inputClasses, "h-9 py-1")}
                    type={field.type}
                  />
                )}
              </div>
            );
          })}

          <Button
            arrow={false}
            disabled={status === "sending"}
            type="submit"
            variant="default"
          >
            {submitButtonLabel}
          </Button>

          {(status === "sent" || status === "error") && (
            <p
              className={cn(
                "mt-4 text-sm",
                status === "sent" ? "text-green-600" : "text-destructive",
              )}
              role="status"
            >
              {messages[locale === "en" ? "en" : "sv"][status]}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export { Form, type Props as FormProps };
