import { Roboto_Slab } from "next/font/google";

import { RootLayout } from "@vincero/site/routes/root-layout";

import "./theme.css";

import type { ReactNode } from "react";

export { generateMetadata } from "@vincero/site/routes/root-layout";

export const revalidate = 3600;

const font = Roboto_Slab({
  weight: ["200", "300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout fontClassName={font.variable}>{children}</RootLayout>;
}
