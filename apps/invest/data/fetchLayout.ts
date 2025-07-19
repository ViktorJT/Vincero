import { throttledFetchData } from "@/data/fetchData";

import { navigationQuery } from "@vincero/data/queries/meta/navigation";
import { contactQuery } from "@vincero/data/queries/meta/contact";
import { siteQuery } from "@vincero/data/queries/meta/site";

import type { Locale } from "@vincero/languages-config";

export async function fetchLayout(locale: Locale) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { navigations }: any = await throttledFetchData({
    query: navigationQuery,
    variables: { locale },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { contacts }: any = await throttledFetchData({
    query: contactQuery,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { sites }: any = await throttledFetchData({
    query: siteQuery,
  });

  return {
    navigation: {
      ...navigations[0],
      ...sites[0],
    },
    footer: {
      ...navigations[0],
      ...contacts[0],
      ...sites[0],
    },
  };
}
