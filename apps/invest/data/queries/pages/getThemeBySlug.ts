import { throttledFetchData } from "@/utils/fetchData";

const query = `
  query Page($slug: String!) {
    page(where: { slug: $slug }) {
      __typename
      id

      dark
    }
  }
`;

export async function getThemeBySlug(slug: string) {
  // @todos naughty any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { page }: any = await throttledFetchData({
    query,
    variables: { slug },
  });

  return {
    ...page,
  };
}
