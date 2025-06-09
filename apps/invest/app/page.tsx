import { defaultLocale } from "@vincero/languages-config";

import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { ComponentMapper } from "@/components/ComponentMapper";

import { getPage } from "@/data/queries/pages/getPage";
import { getSeoBySlug } from "@/data/queries/pages/getSeoBySlug";
import { getLayout } from "@/data/queries/getLayout";

import type { Metadata } from "next";

export const dynamic = "force-static";

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

export default async function HomePage() {
  const { theme, components } = await getPage("homepage", defaultLocale);

  const { navigation, footer } = await getLayout(defaultLocale);

  return (
    <main className={theme.dark ? "dark" : "light"}>
      <Navigation {...navigation} />
      <div>
        <ComponentMapper components={components} />
      </div>
      <Footer {...footer} />
    </main>
  );
}
