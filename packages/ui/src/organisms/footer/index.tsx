import type { Props } from "./index.types";

export function Footer(props: Props) {
  return (
    <footer className="flex flex-col md:flex-row px-6 gap-y-10 py-14 bg-dark text-light text-detail">
      <div className="contents md:block grow">
        <p>SMALL LOGO</p>
        <p className="text-muted text-balance order-last">
          © Copyright Vincero AB - All rights reserved{" "}
          {new Date().getFullYear()}
        </p>
      </div>

      <div className="grow">
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
              {column.map((link) => (
                <a
                  key={`footer-${link.id}`}
                  className="block"
                  href={link.externalUrl}
                >
                  {link.displayText}
                </a>
              ))}
            </ul>
          ),
        )}
      </div>
    </footer>
  );
}