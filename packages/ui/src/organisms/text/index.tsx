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
      <p className="text-detail text-muted md:text-right md:mt-1.5">
        {lockup.title}
      </p>
      <div className="dark:text-light text-dark grid grid-cols-1 md:grid-cols-2 gap-8 text-body lg:text-body-large">
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

function Text({ id, metaInformation = [], heading, body }: TextProps) {
  return (
    <section
      className="dark:bg-dark bg-white relative md:min-h-[72vh] flex items-center px-6 md:px-20 pt-10 pb-20 md:py-16 md:-ml-[160px]"
      id={id}
    >
      <div className="max-w-[540px] mx-auto md:max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 max-w-container-text-offset mx-auto">
          <Paragraph className="first:mt-20" content={metaInformation} />

          {heading && (
            <h1 className="text-dark dark:text-light col-start-1 md:col-start-2 text-heading-large md:text-display-large mb-6 md:mb-10">
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
