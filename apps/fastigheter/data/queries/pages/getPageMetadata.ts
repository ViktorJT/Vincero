import { throttledFetchData } from "@/utils/fetchData";

const query = `
  query GetPageMetadata($slug: String!) {
    page(where: { slug: $slug }) {
      title
      description
      image {
        altText
        url
        width
        height
      }
    }
  }
`;

export async function getPageMetadata(slug: string) {
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
