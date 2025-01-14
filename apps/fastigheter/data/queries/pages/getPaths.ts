import { defaultLocale, locales } from "@vincero/languages-config";

import { throttledFetchData } from "@/utils/fetchData";
import { generatePaths } from "@/utils/generatePaths";

import type { StaticParams } from "@/data/types";

const query = `
  query PagesQuery {
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

export async function getPaths() {
  const { pages } = (await throttledFetchData({ query })) as StaticParams;

  if (!pages || !Array.isArray(pages)) {
    return [];
  }

  const paths = locales.flatMap((locale) =>
    locale === defaultLocale
      ? pages.map((page) => generatePaths(page))
      : pages.map((page) => generatePaths(page, locale)),
  );

  return paths;
}
