import { ComponentMapper } from "@/components/ComponentMapper";
import { getHomepage } from "@/data/queries/pages/getHomepage";

export default async function Homepage() {
  const { modules } = await getHomepage();

  return (
    <main>
      <ComponentMapper modules={modules} />
    </main>
  );
}
