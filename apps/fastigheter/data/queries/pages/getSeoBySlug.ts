import { throttledFetchData } from "@/utils/fetchData";

import { AssetFragment } from "../fragments/Asset";

const query = `
  ${AssetFragment}

  query GetSeoBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      title
      description

      image {
        ...Asset
      }
    }
  }
`;

export async function getSeoBySlug(slug: string) {
  // @todos naughty any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { page }: any = await throttledFetchData({
    query,
    variables: { slug },
  });

  return {
    page,
  };
}
