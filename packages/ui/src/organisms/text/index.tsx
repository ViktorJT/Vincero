import type { TextProps } from "./index.types.ts";

function Text({ id, title, text }: TextProps) {
  return (
    <section
      className="leading-relaxed flex items-center px-6 md:px-20 py-20"
      id={id}
    >
      <div className="flex flex-col md:flex-row gap-y-8 prose">
        <div
          dangerouslySetInnerHTML={{ __html: title.html }}
          className="flex-1 md:pr-6 -mt-1 text-heading"
        />

        <div
          dangerouslySetInnerHTML={{ __html: text.html }}
          className="flex-1 text-body space-y-2 md:space-y-4"
        />
      </div>
    </section>
  );
}

export { Text, type TextProps };
