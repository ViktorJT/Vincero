export interface Link {
  // rename to Props when it gets it's own Button component
  href: string;
  label: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
}

export interface Props {
  title: string;
  description: string;
  links?: Link[];
  className?: string;
  contentClassName?: string;
}
