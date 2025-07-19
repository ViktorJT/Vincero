import { cva } from "class-variance-authority";

export default cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-dark text-white hover:bg-muted",
        outline:
          "border border-dark hover:bg-dark hover:text-white bg-transparent text-dark",
        ghost: "hover:bg-light/50 hover:text-dark",
      },
      size: {
        default: "h-11 px-4 py-1",
        sm: "h-9 px-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
