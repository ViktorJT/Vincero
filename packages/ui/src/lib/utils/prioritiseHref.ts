import type { LinkProps } from "../../types";

export const prioritiseHref = (link: LinkProps) => {
  if (!link) {
    throw new Error("Invalid link passed to prioritiseHref");
  }

  const { external, externalUrl, page, anchor } = link;

  // Handle external URLs
  if (external && externalUrl) {
    return {
      ...link,
      href: externalUrl,
    };
  }

  // For internal links, ensure absolute paths
  const path = `/${[page?.parentPage?.slug, page?.slug].filter(Boolean).join("/")}`;

  // Anchors from Hygraph look like "#id": append without a slash
  const href = !anchor
    ? path
    : anchor.startsWith("#")
      ? `${path}${anchor}`
      : `${path === "/" ? "" : path}/${anchor}`;

  return {
    ...link,
    href,
  };
};
