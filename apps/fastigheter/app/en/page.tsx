import { Home, generateHomeMetadata } from "@/components/Home";

export const revalidate = false;

export const generateMetadata = async () => generateHomeMetadata();

export default async function EnglishHomePage() {
  return <Home locale="en" />;
}
