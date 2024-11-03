type LinkProps = {
  url: string;
  displayText: string;
  variant: "primary" | "secondary" | "tertiary";
  target: string;
  titleAttribute?: string;
  ariaLabel?: string;
};

interface HeaderProps {
  title: string;
  subtitle: string;
  links: LinkProps[];
  background: {
    url: string;
    mimeType: string;
    altText?: string;
  };
}

export type { HeaderProps, LinkProps };
