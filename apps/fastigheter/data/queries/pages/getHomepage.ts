import { getComponentsBySlug } from "./getComponentsBySlug";
import { getThemeBySlug } from "./getThemeBySlug";

export async function getHomepage() {
  const slug = "homepage";

  const components = await getComponentsBySlug(slug);
  const theme = await getThemeBySlug(slug);

  return {
    theme,
    components,
  };
}
