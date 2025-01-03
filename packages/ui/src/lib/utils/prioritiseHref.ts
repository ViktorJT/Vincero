import { defaultLocale } from "@vincero/languages-config";

import type { Locale } from "@vincero/languages-config";
import type { LinkProps } from "../../types";

export const prioritiseHref = (link: LinkProps, locale?: Locale) => {
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

  // Create base path
  const basePath = pathParts.length > 0 ? `/${pathParts.join("/")}` : "/";

  // Add locale prefix if it's not the default locale
  const href =
    locale && locale !== defaultLocale ? `/${locale}${basePath}` : basePath;

  return {
    ...link,
    href,
  };
};
