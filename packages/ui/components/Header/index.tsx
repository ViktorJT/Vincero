import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSplitText } from "@/lib/split-text";
import { cn } from "@/lib/utils";
import { Button } from "@/lib/shadcn/button";
import type { Props } from "./index.types";

export const Header = ({
  title,
  description,
  links,
  className,
  contentClassName,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Split text for animations
  const titleLines = useSplitText(titleRef, {
    tag: "span",
    linesClass: "overflow-hidden inline-block",
  });

  const descLines = useSplitText(descRef, {
    tag: "span",
    linesClass: "overflow-hidden inline-block",
  });

  useEffect(() => {
    if (!ref.current || !titleLines.length || !descLines.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Header slide in
      tl.from(ref.current, {
        yPercent: -100,
        duration: 1,
      });

      // Animate title lines
      tl.from(
        titleLines,
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.4",
      );

      // Animate description lines
      tl.from(
        descLines,
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
        },
        "-=0.4",
      );

      // Animate links if they exist
      if (links?.length) {
        tl.from(
          ".ui-header-link",
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.2",
        );
      }
    });

    return () => ctx.revert();
  }, [titleLines, descLines, links]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm",
        "px-4 py-16 md:px-8 md:py-24",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-7xl", contentClassName)}>
        <h1
          ref={titleRef}
          className="text-4xl font-medium text-foreground md:text-6xl"
        >
          {title}
        </h1>
        <div className="mt-6">
          <p ref={descRef} className="max-w-xl text-lg text-muted-foreground">
            {description}
          </p>
          {links?.length && (
            <div className="mt-8 flex flex-wrap gap-4">
              {links.map((link, index) => (
                <Button
                  key={`${link.href}-${index}`}
                  asChild
                  className="ui-header-link"
                  variant={link.variant || "default"}
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
