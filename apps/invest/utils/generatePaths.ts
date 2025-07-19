import { defaultLocale } from "@vincero/languages-config";

import type { Locale } from "@vincero/languages-config";
import type { Page } from "@/types";

export const generatePaths = ({ parentPage, slug }: Page, locale?: Locale) =>
  slug === "homepage"
    ? locale === defaultLocale
      ? []
      : [locale]
    : locale
      ? parentPage
        ? [locale, parentPage.slug, slug]
        : [locale, slug]
      : parentPage
        ? [parentPage.slug, slug]
        : [slug];
