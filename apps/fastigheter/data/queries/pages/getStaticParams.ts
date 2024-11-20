import { throttledFetchData } from "@/utils/fetchData";

export const query = `
  query GetStaticParams {
    pages(first: 100) {
      __typename
      id

      slug
      parentPage {
        slug
      }
    }
  }
`;

export async function getStaticParams() {
  const data = await throttledFetchData({ query });

  return data;
}
