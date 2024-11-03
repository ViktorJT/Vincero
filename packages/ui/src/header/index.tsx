"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useSplitText } from "../../lib/split-text";

import { Button } from "../atoms/button";

interface HeaderProps {
  title: string;
  subtitle: string;
  links: {
    url: string;
    displayText: string;
    variant: "primary" | "secondary" | "tertiary";
    target: string;
    titleAttribute?: string;
    ariaLabel?: string;
  }[];
  background: {
    url: string;
    mimeType: string;
    altText?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  links,
  background,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const titleLines = useSplitText(titleRef);
  const subtitleLines = useSplitText(subtitleRef);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ref.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.8, ease: "power3.out" },
      ).fromTo(
        [".title", ".subtitle", ".buttons"],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      );
    },
    { dependencies: [titleLines, subtitleLines], scope: ref },
  );

  const isVideo = background?.mimeType.startsWith("video/");

  return (
    <section className="relative w-full overflow-hidden">
      {background && isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={background.url} type={background.mimeType} />
        </video>
      ) : (
        <img
          alt={background.altText || ""}
          className="absolute inset-0 w-full h-full object-cover"
          src={background.url}
        />
      )}
      <div
        ref={ref}
        className="bg-primary flex flex-col justify-center items-start px-4 md:px-8 lg:px-16 text-primary-foreground"
      >
        <div className="max-w-4xl">
          <h1 className="title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <p className="subtitle text-xl md:text-2xl mb-8">{subtitle}</p>
          {links && (
            <div className="buttons flex flex-wrap gap-4">
              {links.map((link, index) => (
                <Button
                  key={index}
                  aria-label={link.ariaLabel}
                  href={link.url}
                  rel={
                    link.target !== "self" ? "noopener noreferrer" : undefined
                  }
                  title={link.titleAttribute}
                  variant={link.variant}
                  //target={link.target === "self" ? undefined : "_blank"}
                >
                  {link.displayText}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
