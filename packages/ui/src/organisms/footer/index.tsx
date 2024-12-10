import Image from "next/image";
import Link from "next/link";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import type { Props } from "./index.types";

// @todos make a footer adapter to add current year to copyrightinformation?

export function Footer(props: Props) {
  return (
    <footer className="flex flex-col px-6 gap-y-10 pt-20 pb-10 bg-dark text-light items-center text-body md:text-body-large">
      <Image
        alt={props.logo.alt || ""}
        className="h-12 w-auto"
        height={props.logo.height}
        src={props.logo.url}
        width={props.logo.width}
      />

      <div className="w-full flex flex-wrap gap-4">
        {/* First Child */}
        <div className="flex-grow basis-[calc(50%-1rem)] text-light min-w-[320px]">
          <p className="font-bold text-muted pb-2">{props.name}</p>
          <p>{props.address}</p>
          <p>
            {props.postalCode} {props.city}
          </p>
          <a href={`mailto:${props.email}`}>{props.email}</a>
        </div>

        {/* Second Child */}
        <div className="flex-grow basis-[calc(50%-1rem)] min-w-[320px]">
          <p className="font-bold text-muted pb-2">Sidor</p>
          <div className="max-w-[560px] grid grid-cols-2 gap-6">
            {[props.leftColumn, props.rightColumn].map(
              (column, colIndex: number) => (
                <ul key={`footer-col-${colIndex}`}>
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
        </div>
      </div>

      <div className="text-detail text-muted text-balance text-center ">
        <p className="uppercase">{props.name}</p>
        <p>{props.copyrightInformation}</p>
      </div>
    </footer>
  );
}
