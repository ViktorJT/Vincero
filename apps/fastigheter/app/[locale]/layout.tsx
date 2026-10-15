import { Manrope } from "next/font/google";

import { RootLayout } from "@vincero/site/routes/root-layout";

import type { ReactNode } from "react";

export {
  generateMetadata,
  generateStaticParams,
} from "@vincero/site/routes/root-layout";

export const revalidate = 3600;

const font = Manrope({
  weight: ["200", "300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function Layout(props: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  return <RootLayout {...props} fontClassName={font.variable} />;
}
