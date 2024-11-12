/* eslint-disable @typescript-eslint/no-explicit-any */
// @todo types here
import { notFound } from "next/navigation";

import { getPageMetadata } from "@/data/queries/pages/getPageMetadata";
import { getPageBySlug } from "@/data/queries/getPageBySlug";
import { getPages } from "@/data/queries/getPages";

import { ComponentMapper } from "@/components/ComponentMapper";

export const dynamicParams = false;

type PageType = {
  slug: string;
  parentPage?: {
    slug: string;
  } | null;
};

export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const { page } = await getPageMetadata(slug[slug.length - 1]);

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      images: [
        {
          url: page.image.url,
          width: page.image.width,
          height: page.image.height,
          alt: page.image.altText || page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image.url],
    },
  };
}

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

  const { dark, modules } = await getPageBySlug(slug[slug.length - 1]);

  if (!modules) notFound();

  return (
    <main className={dark ? "dark" : "light"}>
      <ComponentMapper modules={modules} />
    </main>
  );
}
