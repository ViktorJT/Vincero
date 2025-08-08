import { Title } from "../../molecules/title";
import type { TextProps } from "./index.types.ts";

function Text({ id, title, text }: TextProps) {
  return (
    <section
      className="leading-relaxed flex items-center px-6 md:px-20 py-20"
      id={id}
    >
      <div className="flex flex-col md:flex-row gap-y-8 prose">
        <Title className="contents" subtitle={text} title={title} />
      </div>
    </section>
  );
}

export { Text, type TextProps };
