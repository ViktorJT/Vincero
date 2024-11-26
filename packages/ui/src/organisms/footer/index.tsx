import Image from "next/image";
import Link from "next/link";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import type { Props } from "./index.types";

// @todos make a footer adapter to add current year to copyrightinformation?

export function Footer(props: Props) {
  return (
    <footer className="flex flex-col md:flex-row px-6 gap-y-10 pt-20 pb-10 bg-dark text-light">
      <div className="contents md:block grow">
        <Image
          alt={props.logo.alt || ""}
          className="h-8 w-auto"
          height={props.logo.height}
          src={props.logo.url}
          width={props.logo.width}
        />
        <p className="text-detail text-muted text-balance order-last">
          {props.copyrightInformation}
        </p>
      </div>

      <div>
        <p>{props.name}</p>
        <p>{props.address}</p>
        <p>
          {props.postalCode} {props.city}
        </p>
        <a href={`mailto:${props.email}`}>{props.email}</a>
      </div>

      <div className="grow grid grid-cols-2 gap-6 md:text-right">
        {[props.leftColumn, props.rightColumn].map(
          (column, colIndex: number) => (
            <ul key={`footer-col-${colIndex}`} className="">
              {column.map((navItem) => {
                const { href } = prioritiseHref(navItem.menuLink);
                return (
                  <Link
                    key={`footer-${navItem.id}`}
                    className="block"
                    href={href}
                  >
                    {navItem.menuLink.displayText}
                  </Link>
                );
              })}
            </ul>
          ),
        )}
      </div>
    </footer>
  );
}
