import { throttledFetchData } from "@/utils/fetchData";

export const query = `
  query GetPageMode($slug: String!){
    page(where: { slug: $slug }) {
      dark
    }
  }
`;

export async function getPageMode() {
  const { page } = await throttledFetchData({ query });

  return {
    mode: page.dark ? "dark" : "light",
  };
}
