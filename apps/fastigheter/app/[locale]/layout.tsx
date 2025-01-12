import { Suspense } from "react";

import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { defaultLocale } from "@vincero/languages-config";

import type { ReactNode } from "react";

import { getLayout } from "@/data/queries/getLayout";

import LoadingPage from "./loading";

export default async function LocaleLayout({
  params,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  children: ReactNode;
}) {
  const { locale } = await params;

  const { navigation, footer } = await getLayout(locale ?? defaultLocale);

  return (
    <>
      <Navigation {...navigation} />
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      <Footer {...footer} />
    </>
  );
}
