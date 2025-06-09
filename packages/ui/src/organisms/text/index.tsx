import { RichText } from "@graphcms/rich-text-react-renderer";

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
      className={cn("flex flex-col gap-4 md:contents", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-body lg:text-body-large">
        {lockup.paragraphs?.map(
          ({ raw }: { raw: RichTextContent }, i: number) => (
            <RichText
              key={`${lockup.id}-${i}`}
              content={raw}
              renderers={{
                p: ({ children }) => <p>{children}</p>,
              }}
            />
          ),
        )}
      </div>
    </div>
  ));
}

function Text({ id, accentBackground, heading, body }: TextProps) {
  return (
    <section
      className={cn(
        "relative md:min-h-[40vh] flex items-center px-6 md:px-20 py-10 py-16",
        accentBackground
          ? "bg-accent text-dark"
          : "dark:bg-dark bg-white text-dark dark:text-light",
      )}
      id={id}
    >
      <div className="max-w-[540px] mx-auto md:max-w-none">
        <div className="flex flex-col gap-8 max-w-container-text-offset mx-auto">
          {heading && (
            <h1 className="col-start-1 md:col-start-2 text-heading-large md:text-display-large">
              {heading}
            </h1>
          )}

          <Paragraph content={[body]} />
        </div>
      </div>
    </section>
  );
}

export { Text, Paragraph, type TextProps };
