import { ComponentMapper } from "@/components/ComponentMapper";

import { getHomepage } from "@/data/queries/pages/getHomepage";

// Add generateStaticParams even though empty to signal static generation
export const generateStaticParams = async () => {
  return [];
};

export const revalidate = false;

export default async function Homepage() {
  const { dark, modules } = await getHomepage();

  return (
    <main className={dark ? "dark" : "light"}>
      <ComponentMapper modules={modules} />
    </main>
  );
}
