import { getComponentsBySlug } from "./getComponentsBySlug";
import { getThemeBySlug } from "./getThemeBySlug";

import type { Locale } from "@vincero/languages-config";

export async function getPage(slug: string, locale: Locale) {
  const components = await getComponentsBySlug(slug, locale);
  const theme = await getThemeBySlug(slug);

  return {
    theme,
    components,
  };
}
