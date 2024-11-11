"use client";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { cn } from "../../lib/utils/cn.js";

import type {
  ParagraphProps,
  RichTextContent,
  TextProps,
} from "./index.types.ts";

function Paragraph({
  content = [],
  className,
}: {
  className?: string;
  content: ParagraphProps[];
}) {
  return content.map((lockup: ParagraphProps) => (
    <div
      key={lockup.id}
      className={cn("flex flex-col gap-8 md:contents", className)}
    >
      <p className="animate-text text-detail text-muted md:text-right md:mt-1.5">
        {lockup.title}
      </p>
      <div className="dark:text-light text-dark grid grid-cols-1 md:grid-cols-2 gap-8 text-body md:text-body-large">
        {lockup.paragraphs?.map(
          ({ raw }: { raw: RichTextContent }, i: number) => (
            <RichText
              key={`${lockup.id}-${i}`}
              content={raw}
              renderers={{
                p: ({ children }) => <p className="animate-text">{children}</p>,
              }}
            />
          ),
        )}
      </div>
    </div>
  ));
}

function Text({ metaInformation = [], heading, body }: TextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from("animate-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="dark:bg-dark bg-white relative max-w-[540px] mx-auto md:max-w-none md:min-h-screen flex items-center px-6 md:px-20 py-10 md:py-16 md:-ml-[160px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 max-w-container-text-offset mx-auto">
        <Paragraph content={metaInformation} />

        {heading && (
          <h1 className="animate-text text-dark dark:text-light col-start-1 md:col-start-2 text-heading-large md:text-display-huge my-6 md:my-10">
            {heading}
          </h1>
        )}

        <Paragraph content={[body]} />
      </div>
    </section>
  );
}

export { Text, Paragraph, type TextProps };
