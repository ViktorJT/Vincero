import Link from "next/link";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import { Media } from "../media";

import type { Props } from "./index.types";

export function Footer({
  vinceroLogo,
  title,
  links,
  address,
  postalCode,
  city,
  copyrightInformation,
  email,
  phone,
}: Props) {
  return (
    <footer className="flex flex-col md:flex-row gap-y-6 px-6 py-8 md:py-10 md:px-20 bg-dark text-white text-body">
      <div className="md:flex flex-1 flex-col gap-y-2 md:gap-y-8 contents">
        <Media
          asset={vinceroLogo}
          className="inset-0 h-auto max-w-[132px] object-contain mb-4"
        />

        <div className="flex flex-col items-start">
          <p>{address.text}</p>
          <p>
            {postalCode.text}, {city.text}
          </p>
        </div>

        <div className="flex flex-col items-start gap-y-2">
          <a
            className="underline hover:no-underline"
            href={`mailto:${email.text}`}
          >
            {email.text}
          </a>
          <a
            className="underline hover:no-underline"
            href={`tel:${phone.text}`}
          >
            {phone.text}
          </a>
        </div>

        <p className="text-light text-detail order-last mt-6">
          {copyrightInformation}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="hidden md:block w-px self-stretch mx-10 bg-white"
      />

      <div className="flex flex-col flex-1 items-start gap-y-3 md:gap-y-10">
        <p className="text-detail uppercase text-muted">{title}</p>
        <div className="flex flex-col gap-2">
          {links.map(({ id, menuLink }) => {
            const { displayText, href } = prioritiseHref(menuLink);
            return (
              <Link key={id} className="text-body hover:underline" href={href}>
                {displayText}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
