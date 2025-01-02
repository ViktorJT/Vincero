import { ComponentMapper } from "@/components/ComponentMapper";

import { getSeoBySlug } from "@/data/queries/pages/getSeoBySlug";
import { getHomepage } from "@/data/queries/pages/getHomepage";

import type { Metadata } from "next";

import type { Locale } from "@/configs/locales";

interface HomeProps {
  locale: Locale;
}

export async function generateHomeMetadata(): Promise<Metadata> {
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
  };
}

export async function Home({ locale }: HomeProps) {
  const { theme, components } = await getHomepage(locale);

  return (
    <main className={theme.dark ? "dark" : "light"}>
      <ComponentMapper components={components} />
    </main>
  );
}
