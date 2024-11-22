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

interface StaticParams {
  pages: Array<{
    slug: string;
    parentPage?: {
      slug: string;
    };
  }>;
}

export async function getStaticParams(): Promise<StaticParams> {
  const data = await throttledFetchData({ query });

  return data as StaticParams;
}
