import { defaultLocale } from "@/configs/locales";
import { Home, generateHomeMetadata } from "@/components/Home";

export const revalidate = false;

export const generateMetadata = async () => generateHomeMetadata();

export default async function HomePage() {
  return <Home locale={defaultLocale} />;
}
