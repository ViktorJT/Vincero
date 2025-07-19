import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { getLocaleAndSlugFromPath } from "@/utils/getLocaleAndSlugFromPath";

import { getLayout } from "@/data/queries/getLayout";

import type { LayoutProps } from "@/data/types";

export const dynamic = "auto";
export const revalidate = 3600;

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { path } = await params;
  const { locale } = getLocaleAndSlugFromPath(path);
  const { navigation, footer } = await getLayout(locale);

  return (
    <main>
      <Navigation {...navigation} />
      <div>{children}</div>
      <Footer {...footer} />
    </main>
  );
}
