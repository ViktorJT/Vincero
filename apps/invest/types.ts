import type { ReactNode } from "react";

export interface Page {
  slug: string;
  parentPage?: {
    slug: string;
  };
}

export interface StaticParams {
  pages: Page[];
}

export interface PageProps {
  params: Promise<{
    path: string[];
  }>;
}

export interface LayoutProps extends PageProps {
  children: ReactNode;
}
