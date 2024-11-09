import type { LinkProps } from "../../types";

export const prioritiseHref = (link: LinkProps) => {
  if (link.external) {
    link.href = link.externalUrl;
  } else {
    link.href = link.page?.slug + "/" + link.anchor;
  }
  return link;
};
