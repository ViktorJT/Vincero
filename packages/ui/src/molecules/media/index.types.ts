import type { MediaProps } from "../../types";

export interface Props {
  variant?: "default" | "gallery" | "mason";
  media: MediaProps | MediaProps[];
  className?: string;
}

export type GalleryProps = Omit<Props, "variant" | "media"> & {
  media: MediaProps[];
};

export type MasonProps = Omit<Props, "variant" | "media"> & {
  media: MediaProps[];
};

export type AssetProps = Omit<Props, "variant" | "media"> & {
  media: MediaProps[];
  ref?: HTMLElement;
};
