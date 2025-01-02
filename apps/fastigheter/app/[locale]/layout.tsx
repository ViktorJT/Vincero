import { Suspense } from "react";

import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import type { ReactNode } from "react";

import type { Locale } from "@/configs/locales";

import { getLayout } from "@/data/queries/getLayout";

import { defaultLocale } from "@/configs/locales";

import LoadingPage from "./loading";

export default async function LocaleLayout({
  params,
  children,
}: {
  params: { locale: Locale };
  children: ReactNode;
}) {
  const { locale } = await params;

  const test = await params;
  console.log({ test });

  const { navigation, footer } = await getLayout(locale ?? defaultLocale);

  return (
    <>
      <Navigation {...navigation} />
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      <Footer {...footer} />
    </>
  );
}
