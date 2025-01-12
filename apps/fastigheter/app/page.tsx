import { ComponentMapper } from "@/components/ComponentMapper";
import { locales, defaultLocale } from "@vincero/languages-config";

import { getSeoBySlug } from "@/data/queries/pages/getSeoBySlug";
import { getHomepage } from "@/data/queries/pages/getHomepage";

import type { Metadata } from "next";

export const revalidate = false;

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
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function HomePage({ params }: any) {
  const { locale } = await params;
  const { theme, components } = await getHomepage(locale ?? defaultLocale);

  return (
    <main className={theme.dark ? "dark" : "light"}>
      <ComponentMapper components={components} />
    </main>
  );
}
