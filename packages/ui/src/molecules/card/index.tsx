import Link from "next/link";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { Media } from "../../organisms/media";

import { Container, CardContent, CardHeader } from "../../atoms/card";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { cn } from "../../lib/utils/cn";

import type { FC, ReactNode } from "react";

import type { Props } from "./index.types";

export function Card({
  id,
  asset,
  className,
  mediaClassName,
  link,
  fill = true,
  text,
}: Props) {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    if (!link) {
      return <>{children}</>;
    }

    const { href } = prioritiseHref(link);

    return <Link href={href}>{children}</Link>;
  };

  return (
    <Container
      className={cn(
        "group border-0 bg-white text-dark h-full text-pretty transition-shadow hover:shadow-lg",
        className,
      )}
      id={id}
    >
      <Wrapper>
        <>
          {asset && (
            <CardHeader className="p-0 relative overflow-hidden">
              <Media
                asset={asset}
                className={cn(
                  fill ? "object-cover" : "object-contain",
                  "aspect-[4/3] w-full h-full group-hover:scale-105",
                  mediaClassName,
                )}
              />
            </CardHeader>
          )}
          <CardContent className="p-4 md:p-6 text-body space-y-2 md:space-y-4 break-words">
            <RichText
              content={text.raw}
              renderers={{
                a: ({ children }) => (
                  <a className="underline cursor-pointer break-words">
                    {children}
                  </a>
                ),
                h1: ({ children }) => (
                  <h1 className="text-heading-small md:text-heading">
                    {children}
                  </h1>
                ),
              }}
            />
          </CardContent>
        </>
      </Wrapper>
    </Container>
  );
}
