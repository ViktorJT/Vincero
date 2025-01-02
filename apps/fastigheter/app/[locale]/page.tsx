import type { Locale } from "@/configs/locales";

import Home from "../page";

export default function LocalizedHome({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  return <Home params={{ locale }} />;
}
