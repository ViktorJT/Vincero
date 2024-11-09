import { throttledFetchData } from "@/utils/fetchData";

import { getModulesBySlug } from "@/data/queries/getModulesBySlug";

const query = `
  query Page($slug: String!) {
      page(where: { slug: $slug }) {
      id
      title
      slug
      description
      keywords
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

  const { page } = await throttledFetchData({ query, variables: { slug } });

  const modules = await getModulesBySlug(slug);

  return {
    page,
    modules,
  };
}
