/* eslint-disable @typescript-eslint/no-explicit-any */
// @todos fix types here
import { Navigation } from "@vincero/ui/navigation";
import { getCldOgImageUrl } from "next-cloudinary";
import { Footer } from "@vincero/ui/footer";
import { Inter } from "next/font/google";

import type { Metadata } from "next";
import type { ReactNode } from "react";

// @todo update this to use variable for performance?
const inter = Inter({
  weight: ["200", "300", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

import { getLayout } from "@/data/queries/getLayout";
import { metadataQuery } from "@/data/queries/metadata";

import { throttledFetchData } from "@/utils/fetchData";

import "next-cloudinary/dist/cld-video-player.css";

import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings }: any = await throttledFetchData({
    query: metadataQuery,
  });

  if (!siteSettings) return {};

  const ogImageUrl = getCldOgImageUrl({
    src: siteSettings.defaultMetaImage.public_id,
    format: "jpg",
  });

  const twitterImageUrl = getCldOgImageUrl({
    src: siteSettings.defaultMetaImage.public_id,
    format: "webp",
  });

  return {
    title: {
      default: siteSettings.defaultMetaTitle,
      template: `%s | ${siteSettings.siteTitle}`,
    },
    description: siteSettings.defaultMetaDescription,
    openGraph: {
      title: siteSettings.defaultMetaTitle,
      description: siteSettings.defaultMetaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 627,
          alt: siteSettings.defaultMetaTitle,
        },
      ],
      siteName: siteSettings.siteTitle,
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.defaultMetaTitle,
      description: siteSettings.defaultMetaDescription,
      images: [twitterImageUrl],
    },
    icons: {
      icon: siteSettings.favicon.url,
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
      <body>
        <Navigation {...navigation} />
        {children}
        <Footer {...footer} />
      </body>
    </html>
  );
}
