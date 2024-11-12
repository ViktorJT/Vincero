import { ComponentMapper } from "@/components/ComponentMapper";
import { getHomepage } from "@/data/queries/pages/getHomepage";

export default async function Homepage() {
  const { dark, modules } = await getHomepage();

  return (
    <main className={dark ? "dark" : "light"}>
      <ComponentMapper modules={modules} />
    </main>
  );
}
