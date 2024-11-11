import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import type { Props } from "./index.types";

// @todos make a footer adapter to add current year to copyrightinformation?

export function Footer(props: Props) {
  return (
    <footer className="flex flex-col md:flex-row px-6 gap-y-10 pt-20 pb-10 bg-dark text-light">
      <div className="contents md:block grow">
        <p>SMALL LOGO</p>
        <p className="text-detail text-muted text-balance order-last">
          {props.copyrightInformation}
        </p>
      </div>

      <div>
        <p>{props.contactName}</p>
        <p>{props.contactAddress}</p>
        <p>
          {props.contactPostalCode} {props.contactCity}
        </p>
        <a href={`mailto:${props.contactEmail}`}>{props.contactEmail}</a>
      </div>

      <div className="grow grid grid-cols-2 gap-6 md:text-right">
        {[props.leftColumn, props.rightColumn].map(
          (column, colIndex: number) => (
            <ul key={`footer-col-${colIndex}`} className="">
              {column.map((link) => {
                const { href } = prioritiseHref(link);
                return (
                  <a key={`footer-${link.id}`} className="block" href={href}>
                    {link.displayText}
                  </a>
                );
              })}
            </ul>
          ),
        )}
      </div>
    </footer>
  );
}
