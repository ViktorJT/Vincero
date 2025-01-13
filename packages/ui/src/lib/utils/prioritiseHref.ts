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
  const pathParts = [page?.parentPage?.slug, page?.slug, anchor].filter(
    Boolean,
  );

  const href = pathParts.length > 0 ? `/${pathParts.join("/")}` : "/";

  return {
    ...link,
    href,
  };
};
