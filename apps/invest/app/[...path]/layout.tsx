import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { getLocaleAndSlugFromPath } from "@/utils/getLocaleAndSlugFromPath";

import { fetchLayout } from "@/data/fetchLayout";

import type { LayoutProps } from "@/types";

export const dynamic = "auto";
export const revalidate = 3600;

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { path } = await params;

  const { locale } = getLocaleAndSlugFromPath(path);
  const { navigation, footer } = await fetchLayout(locale);

  return (
    <main>
      <Navigation {...navigation} />
      {children}
      <Footer {...footer} />
    </main>
  );
}
