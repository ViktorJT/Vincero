import { throttledFetchData } from "@/utils/fetchData";

import { getModulesBySlug } from "@/data/queries/getModulesBySlug";

const query = `
  query Page($slug: String!) {
      page(where: { slug: $slug }) {
      id
      title
      slug
      description
      image {
        id
        altText
        mimeType
        url
        width
        height
      }
      parentPage {
        id
        title
      }
      modules(first: 10) {
        ... on Entity {
          id
        }
      }
    }
  }
`;

export async function getHomepage() {
  const slug = "homepage";

  // @todos naughty any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { page }: any = await throttledFetchData({
    query,
    variables: { slug },
  });

  const modules = await getModulesBySlug(slug);

  return {
    page,
    modules,
  };
}
