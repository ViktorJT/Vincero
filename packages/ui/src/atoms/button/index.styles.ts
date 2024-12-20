import { cva } from "class-variance-authority";

export default cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-dark dark:bg-light text-light dark:text-dark hover:bg-light hover:text-dark hover:dark:bg-dark hover:dark:text-light ",
        outline:
          "border border-dark hover:bg-dark hover:dark:bg-light hover:text-light hover:dark:text-dark dark:border-light bg-transparent text-dark dark:text-light hover:dark:text-light hover:dark:border-light",
        secondary: "bg-accent text-dark dark:text-light hover:bg-accent/80",
        ghost:
          "hover:bg-light/50 hover:dark:bg-dark/50 hover:text-dark hover:dark:text-light",
        link: "text-dark dark:text-light underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-1",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
