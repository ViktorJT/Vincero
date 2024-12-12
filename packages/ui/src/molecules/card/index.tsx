import Link from "next/link";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { Media } from "../../organisms/media";

import {
  Container,
  CardContent,
  CardHeader,
  CardFooter,
} from "../../atoms/card";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { cn } from "../../lib/utils/cn";

import type { Props } from "./index.types";
import { Button } from "../../atoms/button";

export function Card({
  id,
  asset,
  className,
  mediaClassName,
  link,
  fill = true,
  text,
}: Props) {
  return (
    <Container
      className={cn(
        "border-0 bg-white text-dark h-full text-pretty",
        className,
      )}
      id={id}
    >
      {asset && (
        <CardHeader className="p-0 relative overflow-hidden">
          <Media
            asset={asset}
            className={cn(
              fill ? "object-cover" : "object-contain",
              "aspect-[4/3] w-full h-full",
              mediaClassName,
            )}
          />
        </CardHeader>
      )}
      <CardContent className="p-4 md:p-6 text-body space-y-2 md:space-y-4 break-words">
        <RichText
          content={text.raw}
          renderers={{
            a: ({ children, className, href }) => (
              <a
                className={cn(
                  "underline cursor-pointer break-words",
                  className,
                )}
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
      </CardContent>
      {link && (
        <CardFooter>
          <Link className="w-full" href={prioritiseHref(link).href}>
            <Button className="w-full">{link.displayText}</Button>
          </Link>
        </CardFooter>
      )}
    </Container>
  );
}
