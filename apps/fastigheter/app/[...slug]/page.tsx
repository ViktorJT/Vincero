import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { getPageMetadata } from "@/data/queries/pages/getPageMetadata";
import { getPageBySlug } from "@/data/queries/getPageBySlug";
import { getPages } from "@/data/queries/getPages";

import { ComponentMapper } from "@/components/ComponentMapper";

// Disable dynamic paths completely for static generation
export const dynamicParams = false;

// Set revalidate to false for full static generation
export const revalidate = false;

type PageType = {
  slug: string;
  parentPage?: {
    slug: string;
  } | null;
};

type MetadataProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: MetadataProps,
): Promise<Metadata> {
  const params = await props.params;

  const slug = params.slug[params.slug.length - 1];
  const { page } = await getPageMetadata(slug);

  if (!page) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

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

    // Transform pages into static paths
    return result.pages.map((page: PageType) => ({
      slug: page.parentPage?.slug
        ? [page.parentPage.slug, page.slug]
        : [page.slug],
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  try {
    const params = await props.params;
    const slug = params.slug[params.slug.length - 1];
    const pageData = await getPageBySlug(slug);

    if (!pageData || !pageData.modules) {
      notFound();
    }

    const { dark, modules } = pageData;

    return (
      <main className={dark ? "dark" : "light"}>
        <ComponentMapper modules={modules} />
      </main>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    notFound();
  }
}
