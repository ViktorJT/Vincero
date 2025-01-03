import type { Locale } from "@vincero/languages-config";

import Home from "../page";

export default async function LocalizedHome({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await params;
  return <Home params={{ locale }} />;
}
