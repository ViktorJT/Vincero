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
  aspectRatio = "aspect-[1/1]",
  link,
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
        "border-0 bg-white text-dark h-full text-pretty",
        className,
      )}
      id={id}
    >
      <Wrapper>
        <>
          {asset && (
            <CardHeader
              className={cn("p-0 relative overflow-hidden", aspectRatio)}
            >
              <Media asset={asset} className="object-cover w-full h-full" />
            </CardHeader>
          )}
          <CardContent className="p-4 md:p-6 text-body space-y-1 break-words">
            <RichText
              content={text.raw}
              renderers={{
                a: ({ children }) => (
                  <a className="underline cursor-pointer break-words">
                    {children}
                  </a>
                ),
              }}
            />
          </CardContent>
        </>
      </Wrapper>
    </Container>
  );
}
