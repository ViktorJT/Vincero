import { getComponentsBySlug } from "./getComponentsBySlug";
import { getThemeBySlug } from "./getThemeBySlug";

import type { Locale } from "@/configs/locales";

export async function getHomepage(locale: Locale) {
  const slug = "homepage";

  const components = await getComponentsBySlug(slug, locale);
  const theme = await getThemeBySlug(slug);

  return {
    theme,
    components,
  };
}
