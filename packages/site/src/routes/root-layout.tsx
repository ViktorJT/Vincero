import { ThemeProvider } from "../components/ThemeProvider";

import type { ReactNode } from "react";
import type { Metadata } from "next";

import { seoQuery } from "@vincero/data/queries/meta/seo";

import { fetchData } from "../data/fetchData";

import "next-cloudinary/dist/cld-video-player.css";
import "../styles/globals.css";

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
  const result = await fetchData<SEOData>({
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

// Each app passes its font's className (next/font with variable "--font-sans")
export function RootLayout({
  fontClassName,
  children,
}: Readonly<{
  fontClassName: string;
  children: ReactNode;
}>) {
  return (
    <html className={`${fontClassName} text-black leading-relaxed`}>
      <head>
        <ThemeProvider />
      </head>

      <body>{children}</body>
    </html>
  );
}
