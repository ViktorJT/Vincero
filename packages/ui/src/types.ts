export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface LinkProps {
  id: string;
  url: string;
  displayText: string;
  variant: ButtonVariant;
  target: string; // @todo set appropriate target based on data from Hygraph OR do it dynamically using the url?
  titleAttribute?: string;
  ariaLabel?: string;
}

export interface MediaProps {
  id: string;
  altText?: string | null;
  mimeType: string;
  url: string;
  width: number;
  height: number;
  footnote?: string;
  className?: string;
}

export interface ProfileProps {
  id: string;
  name: string;
  role: string;
  image: MediaProps;
  email?: string;
}
