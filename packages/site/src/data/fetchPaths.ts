import { fetchData } from "./fetchData";

import type { Page } from "../types";

const query = `
  query PagesQuery {
    pages(first: 100) {
      slug
      parentPage {
        slug
      }
    }
  }
`;

// Path segments for every page except the homepage, e.g. ["projekt", "bruket"].
// The same pages exist in every locale.
export async function fetchPaths() {
  const data = await fetchData<{ pages: Page[] }>({ query });

  return (data?.pages ?? [])
    .filter(({ slug }) => slug && slug !== "homepage")
    .map(({ slug, parentPage }) => ({
      path: parentPage?.slug ? [parentPage.slug, slug] : [slug],
    }));
}
