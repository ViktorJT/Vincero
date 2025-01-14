import { defaultLocale, isValidLocale } from "@vincero/languages-config";

import type { Locale } from "@vincero/languages-config";

interface ReturnType {
  locale: Locale;
  slug: string | undefined;
}

export const getLocaleAndSlugFromPath = (path: string[]): ReturnType => ({
  locale: isValidLocale(path[0]) ? path[0] : defaultLocale,
  slug: path.length === 1 && isValidLocale(path[0]!) ? "homepage" : path.at(-1),
});
