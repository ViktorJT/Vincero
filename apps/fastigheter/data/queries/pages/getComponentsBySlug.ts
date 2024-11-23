/* eslint-disable @typescript-eslint/no-explicit-any */

import { BannerQuery } from "@/data/queries/components/Banner";
import { CarouselQuery } from "@/data/queries/components/Carousel";
import { FormQuery } from "@/data/queries/components/Form";
import { HeaderQuery } from "@/data/queries/components/Header";
import { MediaQuery } from "@/data/queries/components/Media";
import { GalleryQuery } from "@/data/queries/components/Gallery";
import { OverviewQuery } from "@/data/queries/components/Overview";
import { SliderQuery } from "@/data/queries/components/Slider";
import { TextQuery } from "@/data/queries/components/Text";

import { throttledFetchData } from "@/utils/fetchData";

interface EntityType {
  __typename: keyof typeof Queries;
  id: string;
}

const Queries = {
  Banner: BannerQuery,
  Carousel: CarouselQuery,
  Form: FormQuery,
  Header: HeaderQuery,
  Media: MediaQuery,
  Gallery: GalleryQuery,
  Overview: OverviewQuery,
  Slider: SliderQuery,
  Text: TextQuery,
} as const;

export async function getComponentsBySlug(slug: string) {
  const query = `
    query getComponentsBySlug($slug: String!){
      page(where: { slug: $slug }) {
        components(first: 10) {
          ... on Entity {
            id
            __typename
          }
        }
      }
    }
  `;

  const { page }: any = await throttledFetchData({
    query,
    variables: { slug },
  });

  if (!page) return null;

  const promises = page.components.map((component: EntityType) =>
    throttledFetchData({
      query: Queries[component.__typename],
      variables: { id: component.id },
    }),
  );

  const results = await Promise.all(promises);

  const unpacked = results.map(
    (component: Record<string, any>) =>
      Object.values(component)[0] as Record<string, any>,
  );

  const components = page.components.map(
    (component: EntityType, i: number) => ({
      ...component,
      ...unpacked[i],
    }),
  );

  return components;
}