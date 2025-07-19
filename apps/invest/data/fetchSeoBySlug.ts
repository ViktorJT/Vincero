import { throttledFetchData } from "@/data/fetchData";

import { AssetFragment } from "@vincero/data/queries/fragments/Asset";

const query = `
  ${AssetFragment}

  query FetchSeoBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      title
      description

      image {
        ...Asset
      }
    }
  }
`;

export async function fetchSeoBySlug(slug: string) {
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
