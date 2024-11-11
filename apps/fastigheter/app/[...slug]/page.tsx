/* eslint-disable @typescript-eslint/no-explicit-any */
// @todo types here
import { notFound } from "next/navigation";

import { getModulesBySlug } from "@/data/queries/getModulesBySlug";
import { getPages } from "@/data/queries/getPages";

import { ComponentMapper } from "@/components/ComponentMapper";

export const dynamicParams = false;

type PageType = {
  slug: string;
  parentPage?: {
    slug: string;
  } | null;
};

export async function generateStaticParams() {
  try {
    const result = (await getPages()) as { pages: PageType[] };

    if (!result?.pages || !Array.isArray(result.pages)) {
      console.error("No pages found or invalid data");
      return [];
    }

    return result.pages.map((page: PageType) => {
      if (page.parentPage?.slug) {
        return {
          slug: [page.parentPage.slug, page.slug],
        };
      }
      return {
        slug: [page.slug],
      };
    });
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({ params }: any) {
  const { slug } = await params;

  const modules = await getModulesBySlug(slug[slug.length - 1]);

  if (!modules) notFound();

  return (
    <main>
      <ComponentMapper modules={modules} />
    </main>
  );
}
