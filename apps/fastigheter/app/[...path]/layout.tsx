import { Suspense } from "react";

import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { getLocaleAndSlugFromPath } from "@/utils/getLocaleAndSlugFromPath";

import { getLayout } from "@/data/queries/getLayout";

import type { LayoutProps } from "@/data/types";

import LoadingPage from "./loading";

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { path } = await params;
  const { locale } = getLocaleAndSlugFromPath(path);

  const { navigation, footer } = await getLayout(locale);

  return (
    <>
      <Navigation {...navigation} />
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      <Footer {...footer} />
    </>
  );
}
