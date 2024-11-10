import { notFound } from "next/navigation";

import { getModulesBySlug } from "@/data/queries/getModulesBySlug";
import { getPages } from "@/data/queries/getPages";

import { ComponentMapper } from "@/components/ComponentMapper";

export async function generateStaticParams() {
  const { pages } = await getPages();

  return pages.map((page) =>
    page.parentPage ? [page.parentPage.slug, page.slug] : [page.slug],
  );
}

export default async function Page({ params }) {
  const { slug } = await params;

  const modules = await getModulesBySlug(slug[slug.length - 1]);

  if (!modules) notFound();

  return (
    <main>
      <ComponentMapper modules={modules} />
    </main>
  );
}
