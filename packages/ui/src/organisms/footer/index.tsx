import Link from "next/link";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import { Media } from "../media";

import type { Props } from "./index.types";

export function Footer(props: Props) {
  return (
    <footer className="flex flex-col md:flex-row gap-y-6 px-6 py-8 md:py-10 md:px-20 bg-dark text-white text-body">
      <div className="flex flex-1">
        <Media
          asset={props.vinceroLogo}
          className="inset-0 h-auto max-w-[160px] object-contain"
        />
      </div>

      <div className="hidden md:block border-r mx-10" />

      <div className="flex flex-col flex-1 gap-6 md:gap-10">
        <div className="flex flex-col gap-3">
          <p className="text-detail uppercase text-muted">{props.title}</p>
          <div className="flex flex-col gap-2">
            {props.links.map(({ id, menuLink }) => {
              const { displayText, href } = prioritiseHref(menuLink);
              return (
                <Link key={id} href={href}>
                  {displayText}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap border-t md:pb-10 pt-6 md:pt-10">
          {[props.phone, props.email].map((contact) => {
            return (
              <div key={contact.id} className="basis-1/2 space-y-3">
                <p className="text-detail uppercase text-muted">
                  {contact.title}
                </p>
                <p>{contact.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
