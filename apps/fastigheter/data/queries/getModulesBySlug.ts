import { BannerQuery } from "@/data/queries/components/Banner";
import { CarouselQuery } from "@/data/queries/components/Carousel";
import { FormQuery } from "@/data/queries/components/Form";
import { HeaderQuery } from "@/data/queries/components/Header";
import { MediaQuery } from "@/data/queries/components/Media";
import { OverviewQuery } from "@/data/queries/components/Overview";
import { SliderQuery } from "@/data/queries/components/Slider";
import { TextQuery } from "@/data/queries/components/Text";

import { throttledFetchData } from "@/utils/fetchData";

interface BaseModule {
  __typename: keyof typeof Queries;
  id: string;
}

const Queries = {
  Banner: BannerQuery,
  Carousel: CarouselQuery,
  Form: FormQuery,
  Header: HeaderQuery,
  Media: MediaQuery,
  Overview: OverviewQuery,
  Slider: SliderQuery,
  Text: TextQuery,
} as const;

export async function getModulesBySlug(slug: string) {
  const query = `
    query GetModulesBySlug($slug: String!){
      page(where: { slug: $slug }) {
        modules {
          __typename
          ... on Entity {
            id
          }
        }
      }
    }
  `;

  const { page } = await throttledFetchData({
    query,
    variables: { slug },
  });

  const promises = page.modules.map((module: BaseModule) =>
    throttledFetchData({
      query: Queries[module.__typename],
      variables: { id: module.id },
    }),
  );

  const results = await Promise.all(promises);

  const unpacked = results.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (module: Record<string, any>) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.values(module)[0] as Record<string, any>,
  );

  const modules = page.modules.map((module: BaseModule, i: number) => ({
    ...module,
    ...unpacked[i],
  }));

  return modules;
}
