import { defaultLocale } from "@vincero/languages-config";

import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { ComponentMapper } from "@/components/ComponentMapper";

import { fetchComponentsBySlug } from "@/data/fetchComponentsBySlug";
import { fetchSeoBySlug } from "@/data/fetchSeoBySlug";
import { fetchLayout } from "@/data/fetchLayout";

import type { Metadata } from "next";

export const revalidate = 300;

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

export default async function HomePage() {
  const components = await fetchComponentsBySlug("homepage", defaultLocale);
  const { navigation, footer } = await fetchLayout(defaultLocale);

  return (
    <main>
      <Navigation {...navigation} />
      <ComponentMapper components={components} />
      <Footer {...footer} />
    </main>
  );
}
