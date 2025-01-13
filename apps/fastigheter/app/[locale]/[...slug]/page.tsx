import { defaultLocale } from "@vincero/languages-config";

import { notFound } from "next/navigation";

import type { Locale } from "@vincero/languages-config";
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

function parseSlug(slug: string[]): { locale: Locale; cleanSlug: string[] } {
  // Check if first segment is 'en'
  if (slug[0] === "en") {
    return {
      locale: "en",
      cleanSlug: slug.slice(1), // Remove 'en' from slug array
    };
  }

  // Default to Swedish
  return {
    locale: defaultLocale,
    cleanSlug: slug,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}): Promise<Metadata> {
  const result = await params;

  const slug = result.slug[result.slug.length - 1];
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

    // Generate both Swedish and English paths for each page
    const paths = result.pages.flatMap((page) => {
      const slugs = page.parentPage?.slug
        ? [page.parentPage.slug, page.slug]
        : [page.slug];

      // Return both Swedish (default) and English locales
      return [
        { slug: slugs }, // Swedish: /parent/page
        { slug: ["en", ...slugs] }, // English: /en/parent/page
      ];
    });

    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  try {
    const params = await props.params;

    console.warn("LOOK HERE: ", params);

    const { locale, cleanSlug } = parseSlug(params.slug);
    const slug = cleanSlug[cleanSlug.length - 1];

    const [components, theme] = await Promise.all([
      getComponentsBySlug(slug, locale),
      getThemeBySlug(slug),
    ]);

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
