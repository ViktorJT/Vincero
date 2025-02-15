import type { Locale } from "@vincero/languages-config";
import { defaultLocale, isValidLocale } from "@vincero/languages-config";

interface ReturnType {
  locale: Locale;
  slug: string | undefined;
}

export const getLocaleAndSlugFromPath = (path: string[]): ReturnType => {
  // Handle empty path case
  if (!path || path.length === 0) {
    return {
      locale: defaultLocale,
      slug: "homepage",
    };
  }

  const locale = isValidLocale(path[0]) ? path[0] : defaultLocale;
  const slug = path.at(-1);

  // If we only have a locale, it's the homepage
  if (path.length === 1 && isValidLocale(path[0])) {
    return {
      locale,
      slug: "homepage",
    };
  }

  return {
    locale,
    slug,
  };
};
