import { notFound } from "next/navigation";

import { ComponentMapper } from "@/components/ComponentMapper";

import { getSeoBySlug } from "@/data/queries/pages/etSeoBySlug";
import { getPaths } from "@/data/queries/pages/getPaths";
import { getPage } from "@/data/queries/pages/getPage";

import { getLocaleAndSlugFromPath } from "@/utils/getLocaleAndSlugFromPath";

import type { PageProps } from "@/data/types";
import type { Metadata } from "next";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { path } = await params;

  const { slug } = getLocaleAndSlugFromPath(path);

  if (!slug) {
    notFound();
  }

  const { page } = await getSeoBySlug(slug);

  if (!page) {
    notFound();
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
  const paths = await getPaths();

  if (!paths || !Array.isArray(paths)) {
    console.warn("No paths found or invalid paths format");
    return [];
  }

  return paths;
}

export default async function Page({ params }: PageProps) {
  const { path } = await params;

  const { locale, slug } = getLocaleAndSlugFromPath(path);

  if (!slug) {
    notFound();
  }

  const { components } = await getPage(slug!, locale);

  return (
    <>
      <ComponentMapper components={components} />
    </>
  );
}
