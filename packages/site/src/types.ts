import type { ReactNode } from "react";

export interface Page {
  slug: string;
  parentPage?: {
    slug: string;
  };
}

export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export interface PageProps {
  params: Promise<{ locale: string; path: string[] }>;
}

export interface LayoutProps extends LocaleParams {
  children: ReactNode;
}
