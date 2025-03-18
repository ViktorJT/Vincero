import type { CldVideoPlayerProps, CldImageProps } from "next-cloudinary";
import type { RichTextContent } from "@graphcms/rich-text-types";
import type { ImageProps } from "next/image";

import type { ButtonVariants } from "./atoms/button/index.types";

export interface PageProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: AssetProps;
  parentPage?: PageProps;
}

export interface LinkProps {
  id?: string;
  displayText: string;
  description?: string;
  variant: ButtonVariants["variant"];
  external: boolean;
  page?: PageProps;
  externalUrl?: string;
  subLinks?: LinkProps[];
  anchor?: string;
  relAttribute?: string;
  titleAttribute?: string;
  ariaLabel?: string;
  href?: string;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}

export interface ParagraphProps {
  id: string;
  title?: string;
  paragraphs?: {
    raw: RichTextContent;
  }[];
}

export interface AssetProps extends ImageProps {
  mimeType: string;
  url: string;
  optimised?: CloudinaryAssetProps;
  updatedAt: string;
}

interface BaseCloudinaryProps {
  resource_type: "video" | "image";
  public_id: string;
  metadata?: {
    alt?: string;
  };
}

// Union type for all possible Cloudinary props
type CloudinaryAssetProps = BaseCloudinaryProps &
  (
    | ({ resource_type: "video" } & Omit<
        CldVideoPlayerProps,
        keyof BaseCloudinaryProps
      >)
    | ({ resource_type: "image" } & Omit<
        CldImageProps,
        keyof BaseCloudinaryProps
      >)
  );
