import { throttledFetchData } from "@/utils/fetchData";

export const query = `
  {
    pages(first: 100) {
      slug
      parentPage {
        slug
      }
    }
  }
`;

export async function getPages() {
  const data = await throttledFetchData({ query });

  return data;
}
