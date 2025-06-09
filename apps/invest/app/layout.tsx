import { Roboto_Slab } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";

import type { ReactNode } from "react";
import type { Metadata } from "next";

export const dynamic = "auto";
export const revalidate = 3600;

// @todo update this to use variable for performance?
const font = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
  weight: ["200", "300", "500"],
});

import { seoQuery } from "@/data/queries/meta/seo";

import { throttledFetchData } from "@/utils/fetchData";

import "next-cloudinary/dist/cld-video-player.css";
import "@/styles/globals.css";

interface SEOData {
  seos: Array<{
    siteTitle: string;
    metaTitle: string;
    metaDescription: string;
    metaImage: {
      url: string;
      alt?: string;
    };
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await throttledFetchData<SEOData>({
    query: seoQuery,
  });

  if (!result?.seos?.length) return {};

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
  return (
    <html data-theme="invest" className={`${font.variable}`}>
      <head>
        <ThemeProvider />
      </head>

      <body>{children}</body>
    </html>
  );
}
