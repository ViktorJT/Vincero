import { setRequestLocale } from "next-intl/server";

import { ComponentMapper } from "../components/ComponentMapper";

import { fetchComponentsBySlug } from "../data/fetchComponentsBySlug";
import { fetchSeoBySlug } from "../data/fetchSeoBySlug";
import type { Metadata } from "next";
import type { LocaleParams } from "../types";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await fetchSeoBySlug("homepage");

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
  };
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  const components = await fetchComponentsBySlug("homepage", locale);

  return <ComponentMapper components={components} />;
}
