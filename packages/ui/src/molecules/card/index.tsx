import Link from "next/link";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { Media } from "../../organisms/media";

import { Container, CardContent, CardHeader } from "../../atoms/card";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { cn } from "../../lib/utils/cn";

import type { FC, ReactNode } from "react";

import type {
  DefaultCardProps,
  Props,
  TeamCardProps,
  UnitCardProps,
} from "./index.types";

function DefaultCard({ text }: DefaultCardProps) {
  return (
    <RichText
      content={text.raw}
      renderers={{
        p: ({ children }) => <p className="leading-relaxed">{children}</p>,
        a: ({ children, className, href }) => (
          <a
            className={cn("underline cursor-pointer break-words", className)}
            href={href}
          >
            {children}
          </a>
        ),
        h1: ({ children }) => (
          <h1 className="text-heading-small md:text-heading">{children}</h1>
        ),
      }}
    />
  );
}

function TeamCard({ text, email }: TeamCardProps) {
  return (
    <div className="text-body">
      <div
        dangerouslySetInnerHTML={{ __html: text.html }}
        className="prose mb-10"
      />

      {email && (
        <a
          className="transition-colors inline-block hover:underline hover:text-muted"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      )}
    </div>
  );
}

function UnitCard({ title, subtitle, information }: UnitCardProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-heading-small md:text-heading">{title}</p>
        <p className="text-detail text-light">{subtitle}</p>
      </div>
      <div className="space-y-1">
        {information.map(({ title, text, id }) => (
          <div key={id} className="text-body flex justify-between">
            <p className="font-medium">{title}</p>
            <p className="text-right">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Card({
  id,
  link,
  asset,
  className,
  __typename,
  ...props
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
        "group border-0 h-full text-pretty transition-shadow hover:shadow-lg",
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
                  __typename === "TeamCard" ? "aspect-[1/1]" : "aspect-[4/3]",
                  "object-cover w-full h-full group-hover:scale-105",
                )}
              />
            </CardHeader>
          )}
          <CardContent className="p-4 md:p-6 space-y-2 md:space-y-4">
            {__typename === "DefaultCard" && (
              <DefaultCard {...(props as DefaultCardProps)} />
            )}
            {__typename === "TeamCard" && (
              <TeamCard {...(props as TeamCardProps)} />
            )}
            {__typename === "UnitCard" && (
              <UnitCard {...(props as UnitCardProps)} />
            )}
          </CardContent>
        </>
      </Wrapper>
    </Container>
  );
}
