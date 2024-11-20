import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { getComponentsBySlug } from "@/data/queries/pages/getComponentsBySlug";
import { getStaticParams } from "@/data/queries/pages/getStaticParams";
import { getThemeBySlug } from "@/data/queries/pages/getThemeBySlug";
import { getSeoBySlug } from "@/data/queries/pages/getSeoBySlug";

import { ComponentMapper } from "@/components/ComponentMapper";

// Disable dynamic paths completely for static generation
export const dynamicParams = false;

// Set revalidate to false for full static generation
export const revalidate = false;

type PageType = {
  slug: string;
  parentPage?: {
    slug: string;
  };
};

export async function generateMetadata(
  props: Promise<{ slug: string }>,
): Promise<Metadata> {
  const params = await props.params;

  const slug = params.slug[params.slug.length - 1];
  const { page } = await getSeoBySlug(slug);

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
      images: page.image
        ? [
            {
              ...page.image,
              alt: page.image.altText || page.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: page.image ? [page.image.url] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const result = await getStaticParams();

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

    const components = await getComponentsBySlug(slug);
    const theme = await getThemeBySlug(slug);

    if (!components) {
      notFound();
    }

    return (
      <main className={theme.dark ? "dark" : "light"}>
        <ComponentMapper components={components} />
      </main>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    notFound();
  }
}
