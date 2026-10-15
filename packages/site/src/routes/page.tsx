import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@vincero/languages-config/routing";

import { ComponentMapper } from "../components/ComponentMapper";

import { fetchComponentsBySlug } from "../data/fetchComponentsBySlug";
import { fetchSeoBySlug } from "../data/fetchSeoBySlug";
import { fetchPaths } from "../data/fetchPaths";

import type { PageProps } from "../types";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { path } = await params;
  const slug = path.at(-1);

  if (!slug) {
    notFound();
  }

  const { page } = await fetchSeoBySlug(slug);

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

// Called once per locale (from the layout's params); every page exists in
// every locale
export async function generateStaticParams() {
  return fetchPaths();
}

export default async function Page({ params }: PageProps) {
  const { locale, path } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const slug = path.at(-1);

  if (!slug) {
    notFound();
  }

  const components = await fetchComponentsBySlug(slug, locale);

  if (!components?.length) {
    notFound();
  }

  return <ComponentMapper components={components} />;
}
