import type { Metadata } from "next";

import { ComponentMapper } from "@/components/ComponentMapper";

import { getSeoBySlug } from "@/data/queries/pages/getSeoBySlug";
import { getHomepage } from "@/data/queries/pages/getHomepage";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getSeoBySlug("homepage");

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

// Add generateStaticParams even though empty to signal static generation
export const generateStaticParams = async () => {
  return [];
};

export const revalidate = false;

export default async function Homepage() {
  const { theme, components } = await getHomepage();

  return (
    <main className={theme.dark ? "dark" : "light"}>
      <ComponentMapper components={components} />
    </main>
  );
}
