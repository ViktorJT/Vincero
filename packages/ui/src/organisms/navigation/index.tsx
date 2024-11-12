"use client";

import {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { forwardRef, useState, memo, useRef } from "react";
import type { ElementRef, ComponentPropsWithoutRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { LinkProps, Props } from "./index.types";

import { cn } from "../../lib/utils/cn";
import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { usePathname } from "next/navigation";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Styles
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-link transition-colors hover:bg-light/10 hover:text-white data-[active]:bg-light/10 data-[active]:text-white data-[state=open]:bg-light/10 data-[state=open]:text-white",
);

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <Link
          ref={ref}
          className={cn(
            "block cursor-pointer select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-light/10 hover:text-white focus:bg-accent focus:text-light:focus:text-dark",
            className,
          )}
          {...props}
        >
          <div>{title}</div>
          <p className="line-clamp-2 text-detail">{children}</p>
        </Link>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

const NavigationMenuTrigger = memo(
  ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => (
    <Trigger className={cn(navigationMenuTriggerStyle(), "group", className)}>
      {children}{" "}
      <ChevronDown
        aria-hidden="true"
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      />
    </Trigger>
  ),
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// Memoized DropdownContent component
const DropdownContent = memo(({ parentLink }: { parentLink: LinkProps }) => {
  const { href } = prioritiseHref(parentLink);
  return (
    <Content className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto shadow-sm">
      <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-light/10 text-light">
        <ListItem href={href} title={parentLink.displayText}>
          {parentLink.description}
        </ListItem>
        {parentLink.subLinks?.map((subLink: LinkProps) => {
          const { href } = prioritiseHref(subLink);
          return (
            <ListItem key={subLink.id} href={href} title={subLink.displayText}>
              {subLink.description}
            </ListItem>
          );
        })}
      </ul>
    </Content>
  );
});
DropdownContent.displayName = "DropdownContent";

// Memoized NavigationLink component
const NavigationLink = memo(function NavigationLink({
  link,
  onClick,
}: {
  link: LinkProps;
  onClick?: () => void;
}) {
  const { href, external, displayText, ariaLabel } = prioritiseHref(link);

  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className={navigationMenuTriggerStyle()}
        href={href}
        rel={link.relAttribute || "noopener noreferrer"}
        title={link.titleAttribute}
        onClick={onClick}
      >
        {displayText}
      </a>
    );
  }

  return (
    <Link
      aria-label={ariaLabel}
      className={navigationMenuTriggerStyle()}
      href={href}
      onClick={onClick}
    >
      {displayText}
    </Link>
  );
});

// Main Navigation Component
export function Navigation({ className, id, leftColumn, rightColumn }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const allLinks = [...leftColumn, ...rightColumn];

  // Initial load animation
  useGSAP(
    () => {
      if (!isFirstLoad) return;

      gsap.set(navRef.current, { yPercent: -100 });
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
        onComplete: () => setIsFirstLoad(false),
      });
    },
    {
      dependencies: [isFirstLoad],
      scope: navRef,
    },
  );

  // Navigation and scroll animations
  useGSAP(
    () => {
      if (isFirstLoad) return;

      // Reset position on route change
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });

      // Set up scroll animation
      const tl = gsap.timeline({ paused: true });
      tl.to(navRef.current, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.inOut",
      });

      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "100px top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.direction === 1) {
            tl.play();
          } else {
            tl.reverse();
          }
        },
        toggleActions: "play none none reverse",
        markers: false,
      });

      return () => {
        tl.kill();
        trigger.kill();
      };
    },
    {
      dependencies: [isFirstLoad, pathname],
      scope: navRef,
    },
  );

  return (
    <Root
      ref={navRef}
      className={cn(
        "fixed z-20 top-0 w-full text-light will-change-transform",
        className,
      )}
      id={id}
    >
      <div className="relative mx-auto">
        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="bg-dark/20 backdrop-blur flex w-full items-center justify-between p-4 md:hidden">
          <div className="w-8" />
          <div className="text-2xl font-bold">LOGO</div>
          <button
            aria-label="Toggle menu"
            className="text-light focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="relative hidden px-6 h-16 w-full bg-dark items-center justify-between md:flex">
          {/* Left list */}
          <List className="flex items-center space-x-6">
            {leftColumn.map((link) => (
              <Item key={link.id}>
                {link.subLinks?.length ? (
                  <>
                    <NavigationMenuTrigger>
                      {link.displayText}
                    </NavigationMenuTrigger>
                    <DropdownContent parentLink={link} />
                  </>
                ) : (
                  <NavigationLink link={link} />
                )}
              </Item>
            ))}
          </List>

          {/* Center logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold whitespace-nowrap">
            LOGO
          </div>

          {/* Right list */}
          <List className="flex items-center space-x-6">
            {rightColumn.map((link) => (
              <Item key={link.id}>
                {link.subLinks?.length ? (
                  <>
                    <NavigationMenuTrigger>
                      {link.displayText}
                    </NavigationMenuTrigger>
                    <DropdownContent parentLink={link} />
                  </>
                ) : (
                  <NavigationLink link={link} />
                )}
              </Item>
            ))}
          </List>
        </div>

        {/* Mobile Menu - Only visible on mobile when open */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full md:hidden">
            <nav className="flex flex-col space-y-2 p-4 bg-dark/20 backdrop-blur shadow-lg">
              {allLinks.map((link) => (
                <NavigationLink
                  key={link.id}
                  link={link}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}

        <Viewport
          className={cn(
            "origin-top-center absolute left-6 top-full h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-b-md bg-dark text-light shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          )}
        />
      </div>
    </Root>
  );
}
