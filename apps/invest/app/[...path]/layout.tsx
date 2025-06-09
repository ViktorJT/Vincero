import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { getLocaleAndSlugFromPath } from "@/utils/getLocaleAndSlugFromPath";

import { getLayout } from "@/data/queries/getLayout";

import type { LayoutProps } from "@/data/types";
import { getThemeBySlug } from "@/data/queries/pages/getThemeBySlug";

export const dynamic = "force-static";

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { path } = await params;
  const { locale, slug } = getLocaleAndSlugFromPath(path);
  const theme = await getThemeBySlug(slug);
  const { navigation, footer } = await getLayout(locale);

  return (
    <main className={theme?.dark ? "dark" : "light"}>
      <Navigation {...navigation} />
      <div>{children}</div>
      <Footer {...footer} />
    </main>
  );
}
