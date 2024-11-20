import { throttledFetchData } from "@/utils/fetchData";

import { navigationQuery } from "./meta/navigation";
import { contactQuery } from "./meta/contact";
import { siteQuery } from "./meta/site";

export async function getLayout() {
  // @todos types here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { navigations }: any = await throttledFetchData({
    query: navigationQuery,
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
