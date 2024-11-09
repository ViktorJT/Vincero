//import { Navigation } from "@vincero/ui/navigation";
//import { Footer } from "@vincero/ui/footer";
import { Inter } from "next/font/google";

//import type { Metadata } from "next";
import type { ReactNode } from "react";

// @todo update this to use variable for performance?
const inter = Inter({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

//import { getLayout } from "@/data/queries/getLayout";
//import { metadataQuery } from "@/data/queries/metadata";
//
//import { throttledFetchData } from "@/utils/fetchData";

import "@/styles/globals.css";

//export async function generateMetadata(): Promise<Metadata> {
//  const { siteSettings } = await throttledFetchData({ query: metadataQuery });
//
//  return {
//    title: {
//      default: siteSettings.defaultMetaTitle,
//      template: `%s | ${siteSettings.siteTitle}`,
//    },
//    description: siteSettings.defaultMetaDescription,
//    openGraph: {
//      title: siteSettings.defaultMetaTitle,
//      description: siteSettings.defaultMetaDescription,
//      images: [
//        {
//          url: siteSettings.defaultMetaImage.url,
//          width: siteSettings.defaultMetaImage.width,
//          height: siteSettings.defaultMetaImage.height,
//          alt:
//            siteSettings.defaultMetaImage.altText ||
//            siteSettings.defaultMetaTitle,
//        },
//      ],
//      siteName: siteSettings.siteTitle,
//    },
//    twitter: {
//      card: "summary_large_image",
//      title: siteSettings.defaultMetaTitle,
//      description: siteSettings.defaultMetaDescription,
//      images: [siteSettings.defaultMetaImage.url],
//    },
//    icons: {
//      icon: siteSettings.favicon.url,
//    },
//  };
//}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  //const { navigation, footer } = await getLayout();

  return (
    <html data-theme="fastigheter" lang="en" className={`${inter.variable}`}>
      <body>
        {/*<Navigation {...navigation} />*/}
        {children}
        {/*<Footer {...footer} />*/}
      </body>
    </html>
  );
}
