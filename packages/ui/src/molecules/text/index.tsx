import { RichText } from "@graphcms/rich-text-react-renderer";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import type {
  ParagraphProps,
  RichTextContent,
  TextProps,
} from "./index.types.ts";

export function Paragraph({ content = [] }: { content: ParagraphProps[] }) {
  return content.map((lockup: ParagraphProps) => (
    <div key={lockup.id} className="contents">
      <p className="animate-text hero-text text-muted-foreground text-right">
        {lockup.title}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {lockup.paragraphs?.map((paragraph: RichTextContent, i: number) => (
          <RichText
            key={`${lockup.id}-${i}`}
            content={paragraph}
            renderers={{
              p: ({ children }) => <p className="animate-text">{children}</p>,
            }}
          />
        ))}
      </div>
    </div>
  ));
}

export function Text({ metaInformation = [], heading, body }: TextProps) {
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
      className="relative min-h-screen bg-primary text-primary-foreground flex items-center px-4 md:px-8 lg:px-16 py-12 md:py-16"
    >
      <div className="grid grid-cols-[160px_1fr] gap-4 max-w-5xl mx-auto">
        <Paragraph content={metaInformation} />

        {heading && (
          <h1 className="animate-text col-start-2 hero-text text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            {heading}
          </h1>
        )}

        <Paragraph content={body} />
      </div>
    </section>
  );
}
