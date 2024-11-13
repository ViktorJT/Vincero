import { throttledFetchData } from "@/utils/fetchData";

import { getPageBySlug } from "@/data/queries/getPageBySlug";

const query = `
  query Page($slug: String!) {
    page(where: { slug: $slug }) {
      id
      title
      dark
      slug
      description
      image      
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

  const { modules } = await getPageBySlug(slug);

  return {
    ...page,
    modules,
  };
}
