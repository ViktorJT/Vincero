import { defaultLocale, locales } from "@vincero/languages-config";

import { throttledFetchData } from "@/data/fetchData";

import { generatePaths } from "@/utils/generatePaths";
import type { StaticParams } from "@/types";

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

export async function fetchPaths() {
  const { pages } = (await throttledFetchData({ query })) as StaticParams;

  if (!pages || !Array.isArray(pages)) {
    console.warn("No pages found or invalid response");
    return [];
  }

  // Start with the root paths (homepage in different locales)
  const homepagePaths = locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({
      path: [locale],
    }));

  // Generate paths for all other pages
  const contentPaths = locales
    .flatMap((locale) =>
      pages
        .filter((page) => page.slug !== "homepage") // Exclude homepage from regular path generation
        .map((page) => {
          const pathSegments = generatePaths(
            page,
            locale === defaultLocale ? undefined : locale,
          );

          // Filter out any paths that contain undefined or empty segments
          if (!pathSegments || pathSegments.some((segment) => !segment)) {
            return null;
          }

          return {
            path: pathSegments,
          };
        }),
    )
    .filter(
      (item): item is { path: string[] } =>
        Boolean(item) && Array.isArray(item?.path),
    );

  const allPaths = [...homepagePaths, ...contentPaths];

  return allPaths;
}
