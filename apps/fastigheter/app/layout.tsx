// @todos fix types here
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { Navigation } from "@vincero/ui/navigation";
import { Footer } from "@vincero/ui/footer";

import { ThemeProvider } from "@/components/ThemeProvider";

import type { ReactNode } from "react";
import type { Metadata } from "next";

// @todo update this to use variable for performance?
const inter = Inter({
  weight: ["200", "300", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

import { getLayout } from "@/data/queries/getLayout";
import { seoQuery } from "@/data/queries/meta/seo";

import { throttledFetchData } from "@/utils/fetchData";

import LoadingPage from "./loading";

import "next-cloudinary/dist/cld-video-player.css";
import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const result = await throttledFetchData({
    query: seoQuery,
  });

  if (!result) return {};

  const seo = result.seos[0];

  return {
    title: {
      default: seo.metaTitle,
      template: `%s | ${seo.siteTitle}`,
    },
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [
        {
          ...seo.metaImage,
          alt: seo.metaImage ?? seo.metaTitle,
        },
      ],
      siteName: seo.siteTitle,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [seo.metaImage.url],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { navigation, footer } = await getLayout();

  return (
    <html data-theme="fastigheter" lang="en" className={`${inter.variable}`}>
      <head>
        <ThemeProvider />
      </head>

      <body>
        <Navigation {...navigation} />
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        <Footer {...footer} />
      </body>
    </html>
  );
}
