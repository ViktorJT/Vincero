import Link from "next/link";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import type { Props } from "./index.types";

export function Footer(props: Props) {
  return (
    <footer className="flex flex-wrap md:mx-6 px-6 gap-y-10 pt-20 pb-10 bg-dark text-light text-body lg:text-body-large">
      <div className="basis-[calc(50%-1rem)] text-light min-w-[320px]">
        <p className="font-bold text-muted pb-2">{props.name}</p>
        <p>{props.address}</p>
        <p>
          {props.postalCode} {props.city}
        </p>
        <a href={`mailto:${props.email}`}>{props.email}</a>
      </div>

      <div className="basis-[calc(50%-1rem)] min-w-[320px] max-w-[640px]">
        <p className="font-bold text-muted pb-2">Sidor</p>
        <div className="grid grid-cols-2 gap-6">
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

      <p className="grow text-detail text-muted text-balance">
        {props.copyrightInformation}
      </p>
    </footer>
  );
}
